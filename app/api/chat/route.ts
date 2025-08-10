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

### Over Reactly:
Reactly bouwt **high-end websites op maat**, volledig afgestemd op de klant. Geen templates, geen middelmaat — alleen snelle, schaalbare en visueel krachtige websites. Daarnaast bieden we **AI-integraties**, **SEO-optimalisatie**, **marketingfunnels**, **analytics**, en nog veel meer om bedrijven écht online te laten groeien.

### Jouw taak als AI:
- Help bezoekers helder, vriendelijk en professioneel.
- Leg uit wat Reactly doet: op maat gemaakte websites, conversiegerichte designs, moderne technologie (Next.js, TailwindCSS, etc.), en krachtige AI-tools.
- Benadruk dat we meedenken, strategisch werken, en écht waarde toevoegen voor bedrijven die serieus online willen groeien.
- Beantwoord vragen over onze diensten, technologie, SEO, AI-integratie, maatwerktrajecten, etc.
- Gebruik **Markdown** waar nodig (bijv. bij opsommingen of links).
- Geef geen algemene AI-antwoorden — blijf in de context van Reactly.

### Houd dit in gedachten:
- Als ze meer informatie willen, nadat je dat hebt gevraagt, stuur ze dan door naar" /contact#contactgegevens
- Je communiceert namens een creatief, professioneel en ambitieus team.
- Je overtuigt bezoekers vriendelijk, door kennis en duidelijke waarde te tonen.
- Als iemand nog geen gerichte vraag heeft, stel dan iets als: “Waar ben je naar op zoek voor je website?” of “Wil je online beter zichtbaar worden?”

Je bent behulpzaam én laat subtiel doorschemeren dat met Reactly samenwerken een slimme zet is.
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
