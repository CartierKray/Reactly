// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY ontbreekt");
      return NextResponse.json(
        { reply: "Serverconfiguratie mist de OpenAI API key." },
        { status: 500 }
      );
    }

    const systemPrompt = `
Je bent een slimme, professionele en overtuigende AI-assistent van **Reactly** – een webdesign- en marketingbureau.

### Scope (belangrijk)
Je beantwoordt **uitsluitend vragen over**:
- Webdesign & websiteontwikkeling
- Online marketing & leadgeneratie
- SEO & online vindbaarheid
- Conversie-optimalisatie & funnels
- AI-oplossingen voor websites en marketing
- Strategie, UX/UI en performance

Vragen buiten deze onderwerpen beantwoord je niet en leid je vriendelijk terug naar websites, marketing of online groei.

### Over Reactly
Reactly ontwikkelt **maatwerk websites** die snel, schaalbaar en conversiegericht zijn.  
Geen templates, maar strategische oplossingen gebouwd met moderne technologie (o.a. Next.js, TailwindCSS).

### Jouw rol
- Communiceer helder, professioneel en overtuigend
- Leg uit hoe Reactly bedrijven helpt groeien via hun website
- Geef concrete antwoorden over onze diensten
- Help bezoekers hun online behoefte scherp te krijgen
- Begeleid geïnteresseerden richting **/contact#contactgegevens**

### Richtlijnen
- Vertegenwoordig een professioneel en ambitieus team
- Positioneer samenwerken met Reactly als slimme investering
- Stel gerichte vragen zoals:
  - “Wat wil je bereiken met je website?”
  - “Zoek je meer leads, betere vindbaarheid of beide?”

🎯 Doel: Reactly positioneren als **strategische partner voor online groei**.
`;

    const completion = await openai.chat.completions.create({
      // Nieuwste 4o alias; blijft automatisch up-to-date
      model: "chatgpt-4o-latest",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.8,
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(`[Chat ${chatId}] Fout:`, err);
    return NextResponse.json(
      {
        reply: "Er ging iets mis bij het genereren van een antwoord.",
      },
      { status: 500 }
    );
  }
}
