/**
 * app/api/chat/route.ts
 *
 * De AI-assistent van reactly.nl, opgezet zoals de chat van BeterLease:
 * Claude (Anthropic) als standaard, met OpenAI als terugval voor omgevingen
 * waar alleen die sleutel staat. Het antwoord komt als platte tekst binnen
 * (streaming), met twee soorten markeringen die de chat omzet in knoppen:
 *
 *   [[KNOP:x]]      een knop onder het antwoord (offerte, diensten, …);
 *   [[MEDEWERKER]]  de kaart "een collega neemt het over", met formulier.
 *
 * Beveiliging: dit is een publiek endpoint voor een betaalde sleutel. Dus
 * een limiet per IP, een maximale lengte en aantal berichten, een plafond op
 * de omvang van de request en op het aantal tokens per antwoord, en een
 * door de client gestuurde "system"-rol wordt genegeerd.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

import { ADDONS, CARE_PLAN, PACKAGE_GROUPS, SERVICES, WEBSITE_TIERS, euro } from "@/lib/content";
import { clientIp, rateLimit } from "@/lib/leads/rateLimit";
import { OPENING_HOURS, SITE, formatHours } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Zelfde model als de chat van BeterLease; te overschrijven met ANTHROPIC_MODEL. */
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";
/** Modellen die de server-side fallback bij een weigering ondersteunen. */
const MET_FALLBACK = new Set(["claude-sonnet-5-5", "claude-opus-5-5", "claude-opus-5", "claude-fable-5-2", "claude-fable-5-1"]);
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-5.2";

const systemPrompt = `
Je bent de AI-assistent van **Reactly**, een strategisch webdesign- en online marketingbureau uit Velsen-Noord (regio Amsterdam en Haarlem). Je helpt bezoekers van ${SITE.url.replace(/^https?:\/\//, "")} met vragen over websites, webshops en online groei, en brengt ze bij de volgende stap.

---

### Over Reactly
- Maatwerk websites en webshops in Next.js en Tailwind CSS: geen templates, maar snel, SEO-proof en gebouwd om te converteren.
- Online marketing: SEO, Google Ads en SEA, social advertising (Meta, TikTok, LinkedIn), CRO en analytics, branding, AI-chatbots en automatisering.
- Ruim 17 jaar ervaring, één vast aanspreekpunt van idee tot livegang, offerte binnen 24 uur, 4,8/5 op Trustpilot.
- Werkwijze: kennismaking, strategie en design, development, lancering en groei.

📍 Adres: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}
📞 Telefoon en WhatsApp: ${SITE.phone.display}
📧 E-mail: ${SITE.email}
🕒 Openingstijden:
${OPENING_HOURS.map((d) => `- ${d.day}: ${formatHours(d)}`).join("\n")}

### Diensten
${SERVICES.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

### Pakketten (vanaf-prijzen; de exacte investering hangt af van de wensen)
Websitepakketten (eenmalig, excl. btw):
${WEBSITE_TIERS.map((t) => `- ${t.name}: ${t.price ? euro(t.price) : "op maat"}. ${t.summary} ${t.ai.included ? `Inclusief ${t.ai.label.toLowerCase()}.` : `${t.ai.label}.`}`).join("\n")}
Uitbreidingen (bij elk pakket, ideaal om mee te groeien):
${ADDONS.map((a) => `- ${a.name}: ${a.price ? euro(a.price) : "geen opstartkosten"}${a.monthly ? ` + ${euro(a.monthly)} per maand` : ""}. ${a.description}`).join("\n")}
- ${CARE_PLAN.name}: ${euro(CARE_PLAN.monthly)} per maand. ${CARE_PLAN.description}
Marketingpakketten:
${PACKAGE_GROUPS.filter((g) => g.key === "marketing").flatMap((g) => g.packages.map((p) => `- ${p.title}: vanaf ${euro(p.price)}. ${p.description}`)).join("\n")}

---

### Belangrijkste regel: kort
- Antwoord in maximaal 2–3 korte zinnen (hooguit ±60 woorden). Geen lange lijsten, geen kopjes.
- Eén vraag tegelijk. Help de bezoeker zo snel mogelijk naar de volgende stap.
- Zet onder je antwoord waar het past één of twee knoppen. Schrijf een knop als [[KNOP:naam]] op een eigen regel, zonder andere tekst op die regel.
  Beschikbare namen: offerte (aanvraag in 2 minuten), diensten, prijzen, contact (kennismaking plannen), componenten (voorbeelden van componenten en templates), whatsapp, bellen.
- Stuurt de bezoeker een foto, screenshot of pdf (bijvoorbeeld van de huidige website of een briefing), beschrijf kort wat je ziet en wat de volgende stap is.

### Jouw rol
- Je bent een ervaren strateeg: professioneel, vriendelijk en to the point. Spreek de bezoeker aan met "je".
- Een emoji mag, met mate.
- Ontbreekt er informatie, stel dan 1 gerichte vraag (doel, type website of campagne, huidige situatie, budget of planning).
- Geef hooguit 1–2 concrete suggesties en leg in gewone taal uit waarom.
- Gebruik nooit vetgedrukte tekst.
- Noem alleen de prijzen hierboven en zeg erbij dat het vanaf-prijzen zijn. Beloof geen posities in Google, omzet of andere resultaten.
- Je beantwoordt alleen vragen over websites, webshops, online marketing, vindbaarheid, branding, AI voor bedrijven en Reactly zelf. Andere vragen leid je vriendelijk terug.

### Doorverbinden met een collega
Zodra de bezoeker iets concreets wil (een offerte, een kennismaking, teruggebeld worden, een collega spreken) of je de vraag niet zelf kunt beantwoorden:
- Zeg kort dat een collega het graag oppakt en dat de bezoeker zijn gegevens hieronder kan achterlaten, of wijs op de aanvraag in 2 minuten met [[KNOP:offerte]].
- Sluit je antwoord dan af met precies de markering [[MEDEWERKER]] op een eigen regel. Gebruik die markering verder nooit.
- Vraag zelf in de chat niet om naam, telefoonnummer of e-mailadres; daar is het formulier voor.
`.trim();

const CHAT_RATE_LIMIT = { max: 20, windowMs: 5 * 60_000 };
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_BODY_BYTES = 4 * 1024 * 1024; // foto's worden in de browser verkleind
const MAX_BIJLAGEN = 3;
const MAX_BIJLAGE_BYTES = 1.5 * 1024 * 1024;
/** Ruimte voor een kort antwoord, plus wat denkwerk van het model. */
const MAX_TOKENS = 800;
const TOEGESTAAN = ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const;

type Bijlage = { type: (typeof TOEGESTAAN)[number]; data: string };
type UIMessage = { role: "user" | "assistant"; content: string; bijlagen?: Bijlage[] };

/** Alleen echte base64 van toegestane typen, binnen de limieten. */
function schoneBijlagen(input: unknown): Bijlage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (b): b is Bijlage =>
        !!b &&
        (TOEGESTAAN as readonly string[]).includes(b.type) &&
        typeof b.data === "string" &&
        b.data.length * 0.75 <= MAX_BIJLAGE_BYTES &&
        /^[A-Za-z0-9+/=]+$/.test(b.data),
    )
    .slice(0, MAX_BIJLAGEN);
}

const WEIGERING =
  "Daar kan ik je helaas niet mee helpen. Een collega denkt graag met je mee.\n\n[[MEDEWERKER]]";
const FOUT = "Er ging iets mis bij het ophalen van een antwoord. Probeer het later opnieuw of bel ons gerust.";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const limited = rateLimit(`chat:${ip}`, CHAT_RATE_LIMIT.max, CHAT_RATE_LIMIT.windowMs);
  if (!limited.allowed) {
    return new Response("Je stelt vragen sneller dan we ze kunnen beantwoorden. Probeer het over enkele minuten opnieuw.", {
      status: 429,
      headers: { "Retry-After": String(limited.retryAfterSeconds) },
    });
  }

  let body: { messages?: unknown } = {};
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return new Response("Je bericht is te lang.", { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return new Response("Ongeldige aanvraag.", { status: 400 });
  }

  // Alleen user/assistant, beperkte lengte; bijlagen alleen bij het laatste
  // bericht van de bezoeker (scheelt tokens en kosten).
  const messages: UIMessage[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m): m is UIMessage =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS), bijlagen: schoneBijlagen(m.bijlagen) }));
  messages.forEach((m, i) => {
    if (i !== messages.length - 1 || m.role !== "user") m.bijlagen = [];
  });
  // Het gesprek moet met de bezoeker beginnen (het welkomstbericht valt weg).
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (messages.length === 0) return new Response("Geen bericht ontvangen.", { status: 400 });

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!anthropicKey && !openaiKey) {
    console.error("[chat] ANTHROPIC_API_KEY en OPENAI_API_KEY ontbreken");
    return new Response("De chat is op dit moment niet beschikbaar. Bel of WhatsApp ons gerust.", { status: 503 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let verstuurd = false;
      const stuur = (t: string) => {
        if (!t) return;
        verstuurd = true;
        controller.enqueue(encoder.encode(t));
      };
      try {
        if (anthropicKey) {
          const client = new Anthropic({ apiKey: anthropicKey });
          const s = client.beta.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            // Korte chatantwoorden: weinig denkwerk, snel antwoord.
            output_config: { effort: "low" },
            // Vaste systeemprompt: na de eerste vraag uit de cache.
            cache_control: { type: "ephemeral" },
            ...(MET_FALLBACK.has(MODEL) ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const } : {}),
            system: systemPrompt,
            messages: messages.map((m) => ({
              role: m.role,
              content: m.bijlagen?.length
                ? [
                    ...m.bijlagen.map((b) =>
                      b.type === "application/pdf"
                        ? ({ type: "document", source: { type: "base64", media_type: b.type, data: b.data } } as const)
                        : ({ type: "image", source: { type: "base64", media_type: b.type, data: b.data } } as const),
                    ),
                    { type: "text" as const, text: m.content },
                  ]
                : m.content,
            })),
          });
          req.signal.addEventListener("abort", () => s.abort());
          for await (const event of s) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") stuur(event.delta.text);
          }
          const final = await s.finalMessage();
          // Geweigerd zonder antwoord: netjes doorverwijzen naar een collega.
          if (final.stop_reason === "refusal" && !verstuurd) stuur(WEIGERING);
        } else {
          const openai = new OpenAI({ apiKey: openaiKey });
          const completion = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            max_completion_tokens: 1000,
            stream: true,
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map((m) =>
                m.role === "user" && m.bijlagen?.some((b) => b.type !== "application/pdf")
                  ? {
                      role: "user" as const,
                      content: [
                        { type: "text" as const, text: m.content },
                        ...m.bijlagen
                          .filter((b) => b.type !== "application/pdf")
                          .map((b) => ({ type: "image_url" as const, image_url: { url: `data:${b.type};base64,${b.data}` } })),
                      ],
                    }
                  : { role: m.role, content: m.content },
              ),
            ],
          });
          for await (const chunk of completion) stuur(chunk.choices?.[0]?.delta?.content ?? "");
        }
        if (!verstuurd) stuur(FOUT);
        controller.close();
      } catch (err) {
        if (req.signal.aborted) return controller.close();
        const status = err instanceof Anthropic.APIError || err instanceof OpenAI.APIError ? err.status : undefined;
        console.error("[chat] fout:", status ?? "", err instanceof Error ? err.message : err);
        if (!verstuurd) stuur(FOUT);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
