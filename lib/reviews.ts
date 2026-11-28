/**
 * lib/reviews.ts
 *
 * Ervaringen van klanten, zoals ze op de vorige homepage stonden.
 */

export type Review = { handle: string; body: string; author: string; image: string };

export const REVIEWS: Review[] = [
  {
    handle: "@pixelpower",
    body: "Reactly bouwde voor ons een SEO-vriendelijke website die écht het verschil maakt. Binnen een maand verdubbelde onze organische traffic.",
    author: "Eva Boonstra",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    handle: "@growthjunkie",
    body: "De AI-assistent van Reactly is briljant. Ik schrijf nu 3x sneller content voor onze blogs en landingspagina’s. 🚀🚀",
    author: "Tim van Driel",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    handle: "@boldbranding",
    body: "Reactly verzorgde onze volledige rebranding. Logo, kleurgebruik, typografie – alles klopt. We krijgen zóveel positieve reacties!",
    author: "Lisa van Kampen 🏕️",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    handle: "@serpwarrior",
    body: "Na een SEO-audit door Reactly gingen we van pagina 5 naar positie 2 op ons belangrijkste zoekwoord. Ongekend resultaat! 🧠",
    author: "Daniël de Groot",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    handle: "@tiktokboss",
    body: "Dankzij de TikTok-strategie van Reactly kregen we binnen 2 weken meer dan 300.000 views. De scripts en edits waren spot on.",
    author: "Saar Mulder",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    handle: "@uxtomorrow",
    body: "De UX-analyse van Reactly hielp ons bij een complete redesign. Onze conversieratio is met 27% gestegen.",
    author: "Ruben de Leeuw",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    handle: "@devsync",
    body: "De componenten library van Reactly is geniaal. Alles is consistent, responsive en strak vormgegeven. 💪",
    author: "Maarten Scholten",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    handle: "@funnelmaster",
    body: "SEA-campagnes via Reactly hebben ons binnen een week al conversies opgeleverd. Ze weten wat werkt.",
    author: "Inge Bakker",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    handle: "@contentqueen",
    body: "De AI-tools van Reactly helpen me headlines schrijven die écht converteren. Mijn e-mail openrates zijn met 18% gestegen.",
    author: "Julia Vermeer 🌟",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    handle: "@codeandconvert",
    body: "Ik gebruik de componenten library van Reactly voor elk project. Scheelt mij uren werk en alles ziet er professioneel uit.",
    author: "Tom van Dongen",
    image: "https://i.pravatar.cc/150?img=10",
  },
  {
    handle: "@brandingbabe99",
    body: "De branding door Reactly voelt als thuiskomen. Ons merk straalt nu uit wie we écht zijn.",
    author: "Nadine Jaspers",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    handle: "@seogeek",
    body: "Als SEO-specialist ben ik onder de indruk van hoe technisch sterk de fundamenten van Reactly zijn. Alles klopt gewoon.",
    author: "Sjoerd Rijken",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    handle: "@launchfast",
    body: "Binnen vijf dagen had Reactly onze site live ⚡️. Alles zat erin: copy, SEO, analytics. Supersnel en strak werk.",
    author: "Yara Visser",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    handle: "@aivault",
    body: "Met de AI-copy assistent van Reactly genereren we nu complete productomschrijvingen in bulk. En ze lezen nog goed ook!",
    author: "Willem-Jan Peters 📩",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    handle: "@conversionking",
    body: "Reactly’s dashboards maken A/B-testen super eenvoudig. We draaien nu continu CRO-verbeteringen zonder extra developers nodig te hebben.",
    author: "Bram Meijer",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    handle: "@designsnack",
    body: "Als designer gebruik ik standaard de Reactly componenten. Ze zijn clean, modulair en ready to go.",
    author: "Selma Makhlouf 🍋",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    handle: "@smartscale",
    body: "Onze campagnes via Reactly leveren week na week meer leads op. Alles draait nu stabiel en schaalbaar.",
    author: "Oscar van Leeuwen",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    handle: "@mobilefocus",
    body: "Reactly denkt écht mobile-first. Alles werkt perfect op mobiel, zonder dat het design eraan lijdt.",
    author: "Joëlle Veenstra 🇳🇱",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    handle: "@copyhero",
    body: "We gebruiken de AI-assistent van Reactly voor al onze long-form content. De kwaliteit is verrassend goed 🔥",
    author: "Lars Smit",
    image: "https://i.pravatar.cc/150?img=19",
  },
  {
    handle: "@shortandsharp",
    body: "Snelle oplevering. Klaar in één dag. Wauw.",
    author: "Sven Koster",
    image: "https://i.pravatar.cc/150?img=20",
  },
  {
    handle: "@adsboss",
    body: "Onze ROAS is verdubbeld. Meer hoef ik niet te zeggen 💹.",
    author: "Nuray Demir",
    image: "https://i.pravatar.cc/150?img=21",
  },
  {
    handle: "@contentcreep",
    body: "Nooit meer blank staan. De AI-copy geeft me elke dag ideeën.",
    author: "Wouter van Es",
    image: "https://i.pravatar.cc/150?img=22",
  },
  {
    handle: "@minimarketeer",
    body: "Zoveel waarde voor zo'n lage prijs. Bizar gewoon.",
    author: "Tariq Slimani",
    image: "https://i.pravatar.cc/150?img=23",
  },
  {
    handle: "@designrush",
    body: "Alles is strak, responsive en snel. Geen gedoe goed geregeld en mooi design 🎨",
    author: "Lina Petrovic 👩‍💻",
    image: "https://i.pravatar.cc/150?img=24",
  },
  {
    handle: "@snelleton",
    body: "TikTok-ad klaar in 24 uur. Viral gegaan. Thanks.",
    author: "Bas Timmers",
    image: "https://i.pravatar.cc/150?img=25",
  },
  {
    handle: "@kliksandra",
    body: "Kreeg meteen 3 nieuwe leads na livegang. Nice!",
    author: "Sandra Hofstede",
    image: "https://i.pravatar.cc/150?img=26",
  },
  {
    handle: "@headlinelove",
    body: "De headline-generator is geniaal. Echt een gamechanger. Dank jullie wel! 🧡🧡",
    author: "Zoë de Bruin",
    image: "https://i.pravatar.cc/150?img=27",
  },
  {
    handle: "@bouwtotaal",
    body: "Ook als aannemer voel ik me begrepen. Simpel en effectief.",
    author: "Michel Rahimi",
    image: "https://i.pravatar.cc/150?img=28",
  },
  {
    handle: "@mamacreatief",
    body: "Zat in zwangerschapsverlof en tóch door kunnen bouwen aan mijn webshop",
    author: "Annemieke van Zijl 👶",
    image: "https://i.pravatar.cc/150?img=29",
  },

  {
    handle: "@adsninja",
    body: "Sinds Reactly onze advertenties beheert is onze CPC gedaald én krijgen we betere leads. Dubbele winst! 💸💸",
    author: "Timo de Jong",
    image: "https://i.pravatar.cc/150?img=30",
  },
  {
    handle: "@webflowwhiz",
    body: "De migratie naar ons nieuwe platform verliep vlekkeloos. Binnen 48 uur stonden we live – mét SEO behoud. 🌙",
    author: "Jamila Noor",
    image: "https://i.pravatar.cc/150?img=31",
  },
  {
    handle: "@seosultan",
    body: "De support is ongekend snel. Geen tickets, gewoon direct contact en resultaat.",
    author: "Carlos Hernandez",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    handle: "@copycrafter",
    body: "Ik kreeg volledige branding en SEA-strategie op maat. Het voelde alsof ze ons bedrijf al jaren kenden.",
    author: "Aisha Bakari",
    image: "https://i.pravatar.cc/150?img=33",
  },
  {
    handle: "@uxunicorn",
    body: "Door hun lokale SEO-aanpak domineren we nu de eerste pagina van Google in onze regio. Onmisbaar. 💼",
    author: "Hugo Tan",
    image: "https://i.pravatar.cc/150?img=34",
  },
  {
    handle: "@founderstory",
    body: "We gebruikten de AI-copytool voor al onze productteksten. Wat normaal 2 weken duurde, was nu in 2 dagen klaar.",
    author: "Fatima El Idrissi 🥑",
    image: "https://i.pravatar.cc/150?img=36",
  },
  {
    handle: "@clickmaster",
    body: "Als fotograaf was ik sceptisch over marketing automation, maar het werkt écht. Meer boekingen, minder gedoe.",
    author: "Niels Bakker",
    image: "https://i.pravatar.cc/150?img=37",
  },
  {
    handle: "@thebrandchef",
    body: "De social media kits zijn zó handig ✨ Alles consistent, van story tot TikTok reel.",
    author: "Priya Sharma",
    image: "https://i.pravatar.cc/150?img=38",
  },
  {
    handle: "@adsengineer",
    body: "Ik run een webshop en sinds de conversieoptimalisatie is mijn omzet met 35% gestegen. Pure winst.",
    author: "Ahmed Chowdhury",
    image: "https://i.pravatar.cc/150?img=39",
  },
  {
    handle: "@reactdiva",
    body: "Wat ik waardeer: eerlijk advies. Geen mooie praatjes, maar meetbaar resultaat! 🚀",
    author: "Giulia Romano",
    image: "https://i.pravatar.cc/150?img=40",
  },
  {
    handle: "@datadreamer",
    body: "De componenten zijn pixel-perfect. Ideaal voor ons dev-team dat snel wil schakelen zonder in te leveren op stijl.",
    author: "Kwame Mensah",
    image: "https://i.pravatar.cc/150?img=41",
  },
];
