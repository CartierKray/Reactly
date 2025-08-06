"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Container } from "../ui/container";
import Image from "next/image";

interface Review {
  title: string;
  body: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 4.5 | 5;
}

const reviews: Array<Review> = [
  {
    title: "Snelle Afhandeling",
    body: "BeterLease.nl heeft mij geweldig geholpen met mijn financial lease. Binnen twee dagen stond mijn nieuwe bedrijfsauto voor de deur!",
    author: "Henk de Vries",
    rating: 5,
  },
  {
    title: "Geen Aanbetaling, Geweldige Service",
    body: "Ik dacht dat ik zonder aanbetaling geen kans zou maken, maar BeterLease.nl heeft alles soepel geregeld. Echt een aanrader!",
    author: "Simone Jansen",
    rating: 5,
  },
  {
    title: "BKR Was Geen Probleem",
    body: "Zelfs met een BKR-registratie kon ik bij BeterLease.nl terecht. Ik rijd nu een prachtige auto dankzij hun begrip en hulp.",
    author: "Karim El Azzouzi",
    rating: 5,
  },
  {
    title: "Droomauto Binnen Handbereik",
    body: "Ik heb mijn droomauto binnen 48 uur voor de deur staan. BeterLease.nl heeft alle verwachtingen overtroffen. Bedankt!",
    author: "Eva van der Linden",
    rating: 5,
  },
  {
    title: "Uitstekende Klantenservice",
    body: "De klantenservice was altijd bereikbaar en hielp me met al mijn vragen. Ze maakten de hele lease-ervaring zorgeloos.",
    author: "Martijn Bakker",
    rating: 5,
  },
  {
    title: "Aanrader voor ZZP'ers",
    body: "Als ZZP'er is BeterLease.nl echt een uitkomst. Mijn operational lease was snel geregeld zonder gedoe!",
    author: "Nadia Smit",
    rating: 5,
  },
  {
    title: "Perfecte Service voor Startende Ondernemers",
    body: "Als startende ondernemer had ik niet veel opties, maar BeterLease.nl dacht mee en maakte alles mogelijk. Super service!",
    author: "Joost de Boer",
    rating: 5,
  },
  {
    title: "Binnen 2 Dagen Geregeld",
    body: "Binnen 2 werkdagen was alles rond en had ik mijn auto. Het gemak en de snelheid zijn ongeëvenaard!",
    author: "Lotte van der Meer",
    rating: 5,
  },
  {
    title: "Eerlijk en Transparant",
    body: "BeterLease.nl was eerlijk en transparant over de kosten en voorwaarden. Geen verrassingen, alleen maar tevredenheid!",
    author: "Mohamed Alami",
    rating: 5,
  },
  {
    title: "Top voor Financial Lease",
    body: "Mijn financial lease werd zonder enige problemen geregeld. Ik raad BeterLease.nl aan aan iedereen die een bedrijfsauto nodig heeft.",
    author: "Sophie de Lange",
    rating: 5,
  },
  {
    title: "Deskundige Adviseurs",
    body: "De adviseurs van BeterLease.nl weten waar ze het over hebben. Ik voelde me goed begeleid in het hele proces.",
    author: "David Visser",
    rating: 5,
  },
  {
    title: "Een Betrouwbare Partner",
    body: "BeterLease.nl is een betrouwbare partner. Ze hielden zich aan hun woord en leverden precies wat ik nodig had.",
    author: "Anouk de Vries",
    rating: 5,
  },
  {
    title: "BeterLease.nl Heeft Mijn Bedrijf Geholpen",
    body: "Dankzij BeterLease.nl heb ik nu de perfecte bedrijfsauto. Ze hebben mij echt geholpen mijn bedrijf vooruit te brengen.",
    author: "Bram Koster",
    rating: 5,
  },
  {
    title: "Eenvoudig en Efficiënt",
    body: "Het proces bij BeterLease.nl was ongelooflijk eenvoudig. Alles was binnen een paar dagen geregeld zonder gedoe.",
    author: "Floor Willems",
    rating: 5,
  },
  {
    title: "Transparant Over Kosten",
    body: "Bij BeterLease.nl zijn er geen verborgen kosten. Alles wordt helder uitgelegd en er zijn geen verrassingen achteraf.",
    author: "Dirk Maas",
    rating: 5,
  },
  {
    title: "Perfect voor Kleine Ondernemers",
    body: "Als eigenaar van een klein bedrijf vond ik bij BeterLease.nl de perfecte oplossing. Betaalbare en flexibele lease-opties!",
    author: "Kim van Eijk",
    rating: 5,
  },
  {
    title: "Altijd Bereikbaar",
    body: "De klantenservice is altijd bereikbaar en ze staan altijd klaar om te helpen. Echt een topteam!",
    author: "Joost van Kampen",
    rating: 5,
  },
  {
    title: "BeterLease.nl Doet Wat Ze Beloven",
    body: "Ik was sceptisch, maar BeterLease.nl heeft me volledig overtuigd. Ze leveren wat ze beloven.",
    author: "Tessa de Bruin",
    rating: 5,
  },
  {
    title: "Professioneel en Betrokken",
    body: "De medewerkers van BeterLease.nl zijn professioneel en betrokken. Ik voelde me echt gewaardeerd als klant.",
    author: "Robin Hageman",
    rating: 5,
  },
  {
    title: "Geen Lange Wachttijden",
    body: "Bij BeterLease.nl hoef je niet weken te wachten. Binnen een paar dagen rijd je weg in je nieuwe auto.",
    author: "Laura Dekker",
    rating: 5,
  },
  {
    title: "Ideaal voor Startups",
    body: "Als startup had ik moeite om een leaseauto te krijgen, maar BeterLease.nl bood een betaalbare en snelle oplossing.",
    author: "Max van Hoorn",
    rating: 5,
  },
  {
    title: "Ruime Keuze aan Auto's",
    body: "De ruime keuze bij BeterLease.nl is indrukwekkend. Ik vond precies wat ik zocht.",
    author: "Yasmine El Idrissi",
    rating: 5,
  },
  {
    title: "Duidelijke Contractvoorwaarden",
    body: "De contractvoorwaarden waren helder en transparant. Geen kleine lettertjes, alleen eerlijkheid.",
    author: "Niels Jonker",
    rating: 5,
  },
  {
    title: "Perfect voor Seizoensgebonden Werk",
    body: "Met een seizoensbedrijf is flexibiliteit belangrijk. BeterLease.nl bood precies wat ik nodig had!",
    author: "Ilse Kuipers",
    rating: 5,
  },
  {
    title: "BeterLease.nl Zorgt Voor Maatwerk",
    body: "Mijn situatie vroeg om maatwerk en BeterLease.nl leverde dat zonder problemen. Ik ben super tevreden.",
    author: "Rick van Gaal",
    rating: 5,
  },
  {
    title: "Behulpzaam bij de Keuze",
    body: "Ik wist niet welke auto het beste bij mijn bedrijf paste. Het team van BeterLease.nl heeft me perfect geholpen.",
    author: "Martijn de Ridder",
    rating: 5,
  },
  {
    title: "Top voor Zakelijk Gebruik",
    body: "Mijn zakelijke lease was binnen een paar dagen geregeld. BeterLease.nl is een aanrader voor ondernemers.",
    author: "Annemiek Zwart",
    rating: 5,
  },
  {
    title: "Geen Onnodige Formaliteiten",
    body: "Het proces was eenvoudig en zonder onnodige formaliteiten. BeterLease.nl maakt alles makkelijk.",
    author: "Bram Vos",
    rating: 5,
  },
  {
    title: "Snelle Levering",
    body: "Binnen 48 uur reed ik al in mijn nieuwe auto. De snelheid van BeterLease.nl is echt top.",
    author: "Suzanne Bakker",
    rating: 5,
  },
  {
    title: "Aan te Raden Voor Iedereen",
    body: "Ik raad BeterLease.nl aan iedereen aan die een betaalbare en betrouwbare lease zoekt.",
    author: "Thomas van der Meer",
    rating: 5,
  },
  {
    title: "Geen Gezeur met Papieren",
    body: "Bij BeterLease.nl hoef je niet te worstelen met stapels papieren. Alles is snel en digitaal geregeld.",
    author: "Eline Schouten",
    rating: 5,
  },
  {
    title: "Ideale Oplossing voor Mijn Bedrijf",
    body: "Ik heb nu een betrouwbare bedrijfswagen dankzij BeterLease.nl. Ze hebben mijn bedrijf echt geholpen.",
    author: "Daan Hoekstra",
    rating: 5,
  },
  {
    title: "Voor Elk Budget Een Oplossing",
    body: "Ik had een beperkt budget, maar BeterLease.nl vond een auto die perfect past. Super service!",
    author: "Fleur de Groot",
    rating: 5,
  },
  {
    title: "Topadvies van Professionals",
    body: "Het advies dat ik kreeg was eerlijk en deskundig. BeterLease.nl heeft mij goed geholpen.",
    author: "Jeroen Lammers",
    rating: 5,
  },
  {
    title: "Makkelijk In Termijnen Betalen",
    body: "Het is fijn dat ik mijn lease in termijnen kan betalen. BeterLease.nl biedt veel betaalopties.",
    author: "Kimberly van Dam",
    rating: 5,
  },
  {
    title: "Uitgebreide Garantie",
    body: "De garantie die ik kreeg op mijn leaseauto gaf me veel vertrouwen. Ik voel me goed ondersteund.",
    author: "Pieter de Lange",
    rating: 5,
  },
  {
    title: "Duurzaam Wagenpark",
    body: "Ik was op zoek naar een elektrische leaseauto, en BeterLease.nl bood veel duurzame opties.",
    author: "Marit van Leeuwen",
    rating: 5,
  },
  {
    title: "Zelfs met Een Lastige Kredietcheck",
    body: "Ondanks een lastige kredietcheck hielp BeterLease.nl me aan een mooie bedrijfsauto.",
    author: "Wim Scholten",
    rating: 5,
  },
  {
    title: "Helder en Transparant",
    body: "Alles was helder en transparant. Ik wist precies waar ik aan toe was.",
    author: "Saskia Veldhuizen",
    rating: 5,
  },
  {
    title: "Topservice voor Operational Lease",
    body: "Mijn operational lease werd razendsnel geregeld. Ik ben zeer tevreden met BeterLease.nl.",
    author: "Niek Vissers",
    rating: 5,
  },
  {
    title: "Geen Gedoe met Papierwerk",
    body: "Alles werd digitaal geregeld. Geen gedoe met papieren invullen of opsturen. Heel fijn!",
    author: "Merel Kok",
    rating: 5,
  },
  {
    title: "Altijd Goede Communicatie",
    body: "De communicatie met BeterLease.nl was duidelijk en snel. Ik waardeer hun professionaliteit.",
    author: "Hugo Broekhuizen",
    rating: 5,
  },
  {
    title: "Ook voor Particulieren",
    body: "Hoewel ik een particulier ben, heeft BeterLease.nl me fantastisch geholpen aan een leaseauto.",
    author: "Lisa van der Ven",
    rating: 5,
  },
  {
    title: "Ik Ben Erg Blij",
    body: "Ik ben ontzettend blij met de hulp van BeterLease.nl. Het hele proces was snel en probleemloos.",
    author: "Mike Peters",
    rating: 5,
  },
  {
    title: "Geweldige Service bij Financiële Lease",
    body: "Mijn financial lease werd soepel geregeld. Ik ben enorm tevreden met mijn nieuwe auto!",
    author: "Femke Janssen",
    rating: 5,
  },
  {
    title: "Heldere Termijnen",
    body: "De betalingstermijnen zijn helder en flexibel. Geen onverwachte kosten, alleen duidelijkheid.",
    author: "Frank van Hees",
    rating: 5,
  },
  {
    title: "Echt Een Aanrader",
    body: "Ik kan BeterLease.nl aan iedereen aanraden. Ze leveren uitstekende service en kwaliteit.",
    author: "Mila Boer",
    rating: 5,
  },
  {
    title: "Betaalbare Luxeauto’s",
    body: "Dankzij BeterLease.nl rijd ik nu een luxe auto voor een betaalbare prijs. Super tevreden!",
    author: "Koen Smit",
    rating: 5,
  },
  {
    title: "Uitstekende Ervaring",
    body: "Alles verliep vlekkeloos. Ik ben zeer tevreden met mijn keuze voor BeterLease.nl.",
    author: "Nina de Zwart",
    rating: 5,
  },
  {
    title: "Super voor Flexibele Lease",
    body: "Ik had een flexibele lease nodig, en BeterLease.nl bood precies wat ik zocht. Heel blij mee!",
    author: "Rens Jansen",
    rating: 5,
  },
  {
    title: "Oplossingen Voor Ieder Probleem",
    body: "BeterLease.nl vond een oplossing voor mijn situatie, zelfs toen ik dacht dat het onmogelijk was.",
    author: "Ilona Vos",
    rating: 5,
  },
  {
    title: "Prettige Medewerkers",
    body: "De medewerkers van BeterLease.nl zijn vriendelijk en deskundig. Ze nemen de tijd om je goed te helpen.",
    author: "Dennis Brouwer",
    rating: 5,
  },
  {
    title: "Snelle Reacties",
    body: "Ik kreeg altijd snel een reactie op mijn vragen. De service van BeterLease.nl is uitstekend.",
    author: "Tanja van der Laan",
    rating: 5,
  },
  {
    title: "Lange Garantieperiode",
    body: "De garantieperiode die BeterLease.nl biedt is fantastisch. Het geeft me vertrouwen in mijn auto.",
    author: "Jeffrey de Ruiter",
    rating: 5,
  },
  {
    title: "Flexibel en Begripvol",
    body: "BeterLease.nl was flexibel en dacht echt met me mee. Zelfs met mijn situatie konden ze iets moois regelen.",
    author: "Fatma Yildirim",
    rating: 5,
  },
  {
    title: "Zeker Aanbevolen",
    body: "Voor iedereen die op zoek is naar een leaseauto: ga naar BeterLease.nl! Ze zijn snel, vriendelijk en professioneel.",
    author: "Peter van den Heuvel",
    rating: 5,
  },
  {
    title: "De Beste Keuze",
    body: "Ik heb meerdere bedrijven vergeleken, maar BeterLease.nl kwam er het beste uit. Top service!",
    author: "Daan Vermeer",
    rating: 5,
  },
  {
    title: "Eindelijk Mijn Droomauto",
    body: "Altijd gedroomd van een mooie bedrijfsauto, en BeterLease.nl heeft dat mogelijk gemaakt. Super blij!",
    author: "Lisa de Jong",
    rating: 5,
  },
  {
    title: "Fantastische Ondersteuning",
    body: "De ondersteuning van BeterLease.nl was fantastisch. Geen vraag was te veel. Echt geweldig!",
    author: "Ahmed Belhaj",
    rating: 5,
  },
  {
    title: "Alles Ging Zonder Stress",
    body: "Ik had verwacht dat een leaseproces veel stress zou opleveren, maar bij BeterLease.nl was het super makkelijk en soepel.",
    author: "Marlies Bakker",
    rating: 5,
  },
  {
    title: "Goedkope Leaseopties",
    body: "De leaseopties bij BeterLease.nl zijn scherp geprijsd. Ik ben erg tevreden met mijn keuze!",
    author: "Hugo de Boer",
    rating: 5,
  },
  {
    title: "Beste Service Ooit",
    body: "BeterLease.nl levert de beste service ooit. Snel, vriendelijk en professioneel. Ik raad ze zeker aan!",
    author: "Julia Peters",
    rating: 5,
  },
  {
    title: "Binnen 48 Uur Geregeld",
    body: "Ik had haast en BeterLease.nl heeft me binnen 48 uur geholpen. Wat een geweldige service!",
    author: "Tom Hendriks",
    rating: 5,
  },
  {
    title: "Geen Aanbetaling Nodig",
    body: "Dat ik geen aanbetaling nodig had, was een enorme opluchting. Bedankt BeterLease.nl!",
    author: "Eline Vos",
    rating: 5,
  },
  {
    title: "Makkelijk en Snel",
    body: "Het hele proces was makkelijk en snel. BeterLease.nl is de beste keuze die ik kon maken!",
    author: "Freek Mulder",
    rating: 5,
  },
  {
    title: "Vlotte Afhandeling",
    body: "Binnen één werkdag had ik al een offerte en binnen twee dagen stond mijn auto voor de deur. Heel tevreden met BeterLease.nl!",
    author: "Marcel de Graaf",
    rating: 5,
  },
  {
    title: "BKR Geen Obstakel",
    body: "Zelfs met een BKR-registratie hielp BeterLease.nl mij alsnog aan een prachtige bedrijfsauto. Ze kijken echt naar je mogelijkheden!",
    author: "Sarah van Beek",
    rating: 5,
  },
  {
    title: "Betrouwbaar en Snel",
    body: "BeterLease.nl heeft mij goed geholpen met een betrouwbare auto voor mijn bedrijf. Alles werd snel geregeld!",
    author: "Eric Bakker",
    rating: 5,
  },
  {
    title: "Perfect voor Startende Ondernemers",
    body: "Als starter had ik moeite om een lease te vinden, maar BeterLease.nl dacht met me mee. Nu rijd ik een mooie auto!",
    author: "Liesbeth Hendriks",
    rating: 5,
  },
  {
    title: "Flexibele Voorwaarden",
    body: "Ik waardeer de flexibiliteit van BeterLease.nl. Ze hebben echt naar mijn persoonlijke situatie gekeken en een oplossing geboden.",
    author: "Mark van Dijk",
    rating: 4,
  },
  {
    title: "Geen Gedoe",
    body: "Het hele proces was soepel en zonder gedoe. Binnen enkele dagen had ik mijn bedrijfsauto. Geweldig gedaan!",
    author: "Anja Meijer",
    rating: 5,
  },
  {
    title: "BeterLease.nl Denkt Mee",
    body: "Ze hebben écht met mij meegedacht. Door BeterLease.nl heb ik nu de perfecte auto voor mijn zakelijke behoeften.",
    author: "Peter Vos",
    rating: 5,
  },
  {
    title: "Supervriendelijk Personeel",
    body: "Iedereen bij BeterLease.nl is ontzettend vriendelijk en behulpzaam. Ze maken het proces makkelijk en transparant.",
    author: "Nathalie Smits",
    rating: 5,
  },
  {
    title: "Geen Aanbetaling en Toch Snel Geregeld",
    body: "Dat ik geen aanbetaling hoefde te doen was een enorme opluchting. Binnen no-time was alles geregeld. Bedankt BeterLease.nl!",
    author: "Rick van Dam",
    rating: 5,
  },
  {
    title: "Geweldige Ervaring",
    body: "Mijn ervaring met BeterLease.nl was geweldig. Ze zijn snel, transparant en leveren topkwaliteit.",
    author: "Elsa de Koning",
    rating: 5,
  },
  {
    title: "Betaalbaar en Betrouwbaar",
    body: "BeterLease.nl biedt betaalbare oplossingen zonder in te leveren op kwaliteit. Ik ben erg tevreden!",
    author: "Arjan Brouwer",
    rating: 5,
  },
  {
    title: "Transparant en Duidelijk",
    body: "De communicatie was helder en er waren geen verborgen kosten. Ik waardeer de transparantie enorm!",
    author: "Monique de Leeuw",
    rating: 5,
  },
  {
    title: "Top Service voor Financial Lease",
    body: "Mijn financial lease werd supersnel geregeld. Ik zou BeterLease.nl zeker aanraden aan iedereen.",
    author: "Kevin Jansen",
    rating: 5,
  },
  {
    title: "Super voor ZZP'ers",
    body: "Als ZZP'er was ik blij met de flexibiliteit en snelheid van BeterLease.nl. Ze hebben me geweldig geholpen.",
    author: "Linda Verhoeven",
    rating: 5,
  },
  {
    title: "Alles Op Tijd Geleverd",
    body: "Mijn auto werd precies op tijd geleverd, zoals afgesproken. Alles verliep vlekkeloos!",
    author: "Daan Hoekstra",
    rating: 5,
  },
  {
    title: "Goede Keuze voor Operational Lease",
    body: "Ik heb mijn operational lease via BeterLease.nl geregeld. De service was top en ik ben erg blij met mijn auto.",
    author: "Patricia Mulder",
    rating: 5,
  },
  {
    title: "Persoonlijke Benadering",
    body: "De persoonlijke benadering van BeterLease.nl maakte het verschil. Ze nemen echt de tijd voor je!",
    author: "Joep van Loon",
    rating: 5,
  },
  {
    title: "Aanrader voor Iedereen",
    body: "Ik raad BeterLease.nl aan iedereen aan. Ze leveren wat ze beloven en meer. Geweldige service!",
    author: "Esther Jonker",
    rating: 5,
  },
  {
    title: "Kwaliteit en Service",
    body: "De kwaliteit van de auto en de service waren uitstekend. Alles verliep zoals beloofd!",
    author: "Roy Peeters",
    rating: 5,
  },
  {
    title: "Geen Gezeur, Gewoon Goed",
    body: "Bij BeterLease.nl geen gedoe, gewoon een goed geregeld leaseproces. Super tevreden!",
    author: "Sanne de Vos",
    rating: 5,
  },
  {
    title: "Eerlijke Prijzen",
    body: "De prijzen bij BeterLease.nl zijn eerlijk en concurrerend. Zeker de moeite waard!",
    author: "Koen Smit",
    rating: 5,
  },
  {
    title: "Directe Levering",
    body: "Binnen 48 uur stond mijn auto voor de deur. Ik ben super blij met hoe snel alles ging.",
    author: "Laura Bakker",
    rating: 5,
  },
  {
    title: "BeterLease.nl Doet Wat Ze Beloven",
    body: "Geen loze beloftes bij BeterLease.nl. Ze doen wat ze zeggen en ik ben zeer tevreden!",
    author: "Michael van der Berg",
    rating: 5,
  },
  {
    title: "Professioneel Team",
    body: "Het team van BeterLease.nl is zeer professioneel. Het hele proces verliep soepel en zonder stress.",
    author: "Hanneke Visser",
    rating: 5,
  },
  {
    title: "Hulp bij BKR",
    body: "Ik had een BKR-registratie, maar dankzij BeterLease.nl kon ik toch een auto leasen. Super service!",
    author: "Tom van Es",
    rating: 5,
  },
  {
    title: "Geen Verborgen Kosten",
    body: "Het fijnste aan BeterLease.nl is dat er geen verborgen kosten zijn. Alles is transparant!",
    author: "Sofie Janssen",
    rating: 5,
  },
  {
    title: "Vriendelijk en Betrokken",
    body: "Het team van BeterLease.nl is ontzettend vriendelijk en betrokken. Een echte aanrader!",
    author: "Bas van Doorn",
    rating: 5,
  },
  {
    title: "Mijn Droomauto Staat Voor De Deur",
    body: "Dankzij BeterLease.nl rijd ik nu eindelijk mijn droomauto. Ik ben zo blij met hun hulp!",
    author: "Kelly de Wit",
    rating: 5,
  },
  {
    title: "Uitmuntende Klantenservice",
    body: "De klantenservice van BeterLease.nl was snel en behulpzaam. Ik voelde me echt gehoord.",
    author: "Jeroen Schouten",
    rating: 5,
  },
  {
    title: "Flexibele Betalingsmogelijkheden",
    body: "De flexibiliteit van BeterLease.nl is geweldig. Ze hielpen me met een betalingsplan dat bij mijn situatie past.",
    author: "Daphne van Vliet",
    rating: 5,
  },
];

function StarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: Review["rating"] }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        {[...Array(5).keys()].map((index) => (
          <StarIcon
            key={index}
            className={clsx(
              "h-5 w-5",
              rating > index ? "fill-yellow-400" : "fill-gray-300"
            )}
          />
        ))}
      </div>
      <div>
        <Image
          src="/images/google-sm.png"
          alt="google reviews"
          width={10000}
          height={1000}
          className="h-5 w-5"
        />
      </div>
    </div>
  );
}

function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"figure">, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl bg-white border-1 border border-gray-200 backdrop-blur-md p-6 opacity-0 ",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-black">
        <StarRating rating={rating} />
        {/* <p className="mt-4 text-lg text-white font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p> */}
        <p className="mt-6 text-[15px] font-normal text-black">{body}</p>
      </blockquote>
      <figcaption className="mt-6 text-sm font-light text-black/75 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>;
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  let columnRef = useRef<React.ElementRef<"div">>(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) {
      return;
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef<React.ElementRef<"div">>(null);
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  let column1 = columns[0];
  let column2 = columns[1];
  let column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-16 p-1 grid h-[52rem] max-h-[150vh] items-start gap-8 overflow-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  "md:hidden",
                reviewIndex >= column1.length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white" />
    </div>
  );
}

export function ReviewsThree() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-16 md:pt-0 p-14 md:p-12 pb-20 md:pb-36"
    >
      <Container>
        <ReviewGrid />
      </Container>
    </section>
  );
}
