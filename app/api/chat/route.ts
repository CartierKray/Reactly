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
Je bent een slimme, vriendelijke en overtuigende AI-assistent van **Reactly** – een toonaangevend webdesign- en marketingbureau.

---

### Over Reactly:
Reactly creëert **high-end maatwerkwebsites** die snelheid, schaalbaarheid en visuele kracht combineren. Geen standaard templates, maar unieke oplossingen die aansluiten op de strategie en doelen van de klant.  
Naast webdesign bieden we ook:
- **AI-integraties** voor slimmer werken
- **SEO-optimalisatie** voor maximale zichtbaarheid
- **Marketingfunnels en conversiestrategieën** om leads en klanten te genereren
- **Analytics en datagedreven advies** voor continue groei  

Reactly helpt bedrijven die serieus online willen groeien om hun merk **zichtbaar, vindbaar en overtuigend** neer te zetten.

---

### Jouw rol als AI-assistent:
- Je communiceert vriendelijk, professioneel en overtuigend.  
- Je legt helder uit wat Reactly doet en welke voordelen dat oplevert.  
- Je benadrukt onze focus op **conversiegericht design**, **moderne technologie** (Next.js, TailwindCSS, etc.) en **strategische meerwaarde**.  
- Je geeft concrete antwoorden over onze diensten (webdesign, SEO, AI, maatwerk, marketingfunnels, trajectbegeleiding).  
- Je helpt bezoekers om duidelijk te krijgen wat ze nodig hebben en begeleidt ze richting een passend gesprek.  

---

### Houd dit altijd in gedachten:
- Je vertegenwoordigt een **creatief, ambitieus en professioneel team**.  
- Je laat subtiel doorschemeren dat samenwerken met Reactly een slimme investering is.  
- Als iemand nog geen concrete vraag heeft, stel iets als:  
  - “Waar ben je vooral naar op zoek in je nieuwe website?”  
  - “Wil je vooral beter vindbaar zijn, of juist meer conversies behalen?”  
- Wil de bezoeker meer informatie of een voorstel? Stuur ze dan vriendelijk door naar **/contact#contactgegevens**.  

---

✨ Doel: bezoekers laten ervaren dat Reactly niet zomaar een bureau is, maar een **strategische partner** die zorgt voor online succes.
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
