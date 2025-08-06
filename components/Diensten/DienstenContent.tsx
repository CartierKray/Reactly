import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import DoubleScrollingText from "../Banner/DoubleScrollingText";
import DoubleScrollingTextStraight from "../Banner/DoubleScrollingTextStraight";
import DoubleScrollingTextTwo from "../Banner/DoubleScrollingTextTwo";

function DienstenContent() {
  return (
    <>
      <div>
        <div className="pb-20 ">
          <div
            id="beton"
            className="p-5 pb-20 pt-20 flex text-center items-center justify-start"
          >
            <div className="bg-white w-full mx-auto max-w-2xl text-start">
              <div className="text-7xl lg:text-9xl font-semibold mb-10">
                SEO & SEA
              </div>
              <div className="text-3xl lg:text-4xl font-medium mb-5">
                1. Herstellen van betonschade
              </div>
              <div className="font-light text-lg leading-7">
                Betonschade kan door verschillende oorzaken ontstaan, zoals
                blootstelling aan extreme weersomstandigheden, slijtage, en
                structurele problemen. Deze schade kan de veiligheid,
                duurzaamheid en uitstraling van je gebouw negatief beïnvloeden.
                Onze specialisten hebben jarenlange ervaring in het herstellen
                van diverse soorten betonschade. We voeren een grondige
                inspectie uit om de aard en omvang van de schade te bepalen en
                gebruiken vervolgens geavanceerde technieken om de reparaties
                uit te voeren. Dit zorgt ervoor dat je betonconstructie weer in
                uitstekende staat verkeert en bestand is tegen toekomstige
                belastingen.
              </div>
              <div className=" text-3xl lg:text-4xl font-medium mt-10 mb-5">
                2. Herstellen beton staal (anti-corrosie)
              </div>
              <div className="font-light text-lg leading-7">
                Betonstaal, ook wel bekend als wapeningsstaal, is een cruciaal
                onderdeel van betonnen constructies. Het kan echter corroderen
                door blootstelling aan vocht en andere elementen. Deze corrosie
                kan de sterkte van je constructie aantasten. Wij bieden
                specialistische diensten aan voor het herstellen en beschermen
                van betonstaal. Onze anti-corrosiebehandelingen omvatten het
                verwijderen van roest, het aanbrengen van beschermende coatings
                en het herstellen van aangetast beton. Deze aanpak verlengt de
                levensduur van je constructies en zorgt voor langdurige
                bescherming tegen verdere corrosie.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                3. Constructieve betonherstel
              </div>
              <div className="font-light text-lg leading-7">
                Constructieve betonherstel is essentieel wanneer de integriteit
                van de dragende elementen van een gebouw is aangetast. Dit kan
                nodig zijn bij ernstige schade door slijtage, zware belasting,
                of na structurele veranderingen. Onze aanpak omvat een
                gedetailleerde analyse van de constructie, gevolgd door het
                versterken en herstellen van de beschadigde delen. We gebruiken
                hoogwaardige materialen en moderne technieken om ervoor te
                zorgen dat de herstelde constructie weer veilig, stabiel en
                duurzaam is. Onze jarenlange ervaring garandeert dat elke
                reparatie voldoet aan de hoogste normen.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                4. Horizontale en verticale reparatie
              </div>
              <div className="font-light text-lg leading-7">
                Of het nu gaat om horizontale oppervlakken zoals vloeren en
                plafonds, of verticale oppervlakken zoals muren en kolommen, wij
                hebben de expertise om alle soorten betonschade te repareren.
                Onze technieken en materialen zijn specifiek afgestemd op de
                aard van de schade en de positie van het te repareren oppervlak.
                Dit zorgt voor een naadloze en duurzame reparatie die de
                oorspronkelijke sterkte en uitstraling van het beton herstelt.
                Met onze uitgebreide ervaring in zowel horizontale als verticale
                betonreparaties, kun je vertrouwen op een perfect resultaat.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                5. Bekisting op maat maken m.b.t. betonstorten
              </div>
              <div className="font-light text-lg leading-7">
                Bij het storten van beton is een nauwkeurig ontworpen bekisting
                essentieel om de gewenste vorm en structuur te verkrijgen. Wij
                bieden op maat gemaakte bekistingen die speciaal zijn ontworpen
                voor jouw projectvereisten. Onze vakmensen ontwerpen en
                vervaardigen bekistingen die perfect passen bij de specificaties
                van je project, waardoor een hoge mate van precisie en
                efficiëntie wordt bereikt. Dit resulteert in een hoogwaardige
                afwerking van je betonconstructies. Met onze expertise in het
                maken van bekistingen, ben je verzekerd van een solide basis
                voor al je betonstortprojecten.
              </div>
              <div className="mt-10">
                <Image
                  src="/images/stangelSix.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  className="rounded-md shadow-md"
                />
              </div>
              <Link href="/offerte">
                <div className="mt-10 pb-5">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Offerte aanvragen
                  </Button>
                </div>
              </Link>
              <Link href="/contact">
                <div className="">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Neem contact op
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          <DoubleScrollingText />
          <div
            id="plafond"
            className="p-5 pt-24 pb-20 flex text-center items-center justify-start"
          >
            <div className="bg-white w-full mx-auto max-w-2xl text-start">
              <div className="text-7xl lg:text-9xl font-semibold mb-10">
                Webdesign
              </div>
              <div className="text-3xl lg:text-4xl font-medium mb-5">
                1. Herstellen betonschade
              </div>
              <div className="font-light text-lg leading-7">
                Betonschade aan plafonds kan de veiligheid en esthetiek van een
                ruimte ernstig beïnvloeden. Wij specialiseren ons in het
                herstellen van dergelijke schade met technieken die de
                oorspronkelijke sterkte en uitstraling van het beton herstellen.
                Ons team voert een grondige inspectie uit om de schade te
                beoordelen en gebruikt vervolgens hoogwaardige materialen voor
                de reparatie. Hierdoor wordt je plafond weer veilig en ziet het
                er als nieuw uit. Met jarenlange ervaring in het herstellen van
                betonnen plafonds, garanderen we een duurzame en betrouwbare
                oplossing.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                2. Ontstoffen & ontvetten
              </div>
              <div className="font-light text-lg leading-7">
                Voordat we verdere werkzaamheden aan een plafond uitvoeren, is
                het belangrijk om het oppervlak grondig te ontstoffen en te
                ontvetten. Dit zorgt voor een betere hechting van verf, stucwerk
                of andere afwerkingen. Wij gebruiken professionele methoden en
                producten om alle vuil, stof en vet van het plafond te
                verwijderen. Dit proces bereidt je plafond voor op een perfecte
                afwerking en draagt bij aan de duurzaamheid van de aangebrachte
                materialen. Met onze zorgvuldige aanpak zorgen we voor een
                schone en geschikte ondergrond voor verdere behandeling.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                3. Dampdoorlatende buitenverf (wit)
              </div>
              <div className="font-light text-lg leading-7">
                Voor betonnen plafonds die blootgesteld worden aan externe
                invloeden, is het belangrijk om een dampdoorlatende verf te
                gebruiken. Deze verf laat vocht uit het beton ontsnappen,
                terwijl het water van buitenaf buiten houdt. Wij bieden
                hoogwaardige, witte dampdoorlatende buitenverf aan die niet
                alleen beschermt, maar ook een frisse en schone uitstraling
                geeft. Onze professionele schilders zorgen voor een gelijkmatige
                en duurzame afwerking die je plafond beschermt tegen de
                elementen. Kies voor onze verfoplossingen voor een mooi en
                duurzaam resultaat.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                4. Stucen plafond
              </div>
              <div className="font-light text-lg leading-7">
                Een glad en strak gestuct plafond kan een enorme verbetering
                zijn voor de uitstraling van een ruimte. Wij bieden
                professionele stucwerkdiensten voor betonnen plafonds. Ons team
                van ervaren stukadoors zorgt voor een perfect gladde afwerking
                die klaar is voor schilderen of andere afwerkingen
              </div>
              <div className="mt-10">
                <Image
                  src="/images/stangelFive.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  className="rounded-md shadow-md"
                />
              </div>
              <Link href="/offerte">
                <div className="mt-10 pb-5">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Offerte aanvragen
                  </Button>
                </div>
              </Link>
              <Link href="/contact">
                <div className="">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Neem contact op
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          <DoubleScrollingTextTwo />
          <div
            id="vloeren"
            className="p-5 pt-24 flex text-center items-center justify-start"
          >
            <div className="bg-white w-full mx-auto max-w-2xl text-start">
              <div className="text-7xl lg:text-9xl font-semibold mb-10">
                Marketing
              </div>
              <div className="text-3xl lg:text-4xl font-medium mb-5">
                1. Vervangen betonnen vloeren
              </div>
              <div className="font-light text-lg leading-7">
                Betonnen vloeren zijn duurzaam en sterk, maar kunnen na verloop
                van tijd beschadigd of versleten raken. Wij bieden uitgebreide
                diensten aan voor het vervangen van betonnen vloeren. Dit proces
                omvat het zorgvuldig verwijderen van de oude vloer, het
                voorbereiden van de ondergrond en het gieten van een nieuwe
                betonnen vloer. Onze vakmensen zorgen ervoor dat de nieuwe vloer
                perfect is afgewerkt en voldoet aan alle specificaties. Met onze
                ervaring en toewijding leveren we vloeren die niet alleen
                functioneel, maar ook esthetisch aantrekkelijk zijn.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                2. Deels/geheel op afschot vloer
              </div>
              <div className="font-light text-lg leading-7">
                Een vloer op afschot zorgt voor een goede waterafvoer, wat
                essentieel is in omgevingen waar wateraccumulatie een probleem
                kan zijn. Wij bieden oplossingen voor zowel gedeeltelijke als
                volledige afschotvloeren. Onze deskundige teams kunnen de
                benodigde helling nauwkeurig berekenen en aanbrengen, zodat
                water effectief wordt afgevoerd. Dit voorkomt schade door water
                en zorgt voor een veiligere en schonere omgeving. Of het nu gaat
                om een klein gebied of een volledige vloer, wij hebben de
                expertise om een duurzame en efficiënte afschotvloer te
                realiseren.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                3.Vernieuwing put (dia. 80mm)
              </div>
              <div className="font-light text-lg leading-7">
                Putten met een diameter van 80mm spelen een cruciale rol in de
                waterafvoer van betonnen vloeren. Als deze putten beschadigd of
                versleten zijn, kan dat leiden tot waterophoping en mogelijke
                schade. Wij bieden diensten aan voor de vernieuwing van
                dergelijke putten. Dit omvat het verwijderen van de oude put,
                het voorbereiden van de vloer en het installeren van een nieuwe,
                duurzame put. Onze methoden zorgen ervoor dat de nieuwe put
                naadloos integreert met de bestaande vloer en efficiënt
                functioneert. Met onze ervaring in putvernieuwing garanderen we
                een effectieve oplossing voor je afwateringsbehoeften.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                4. Waterdichte epoxy coating systeem
              </div>
              <div className="font-light text-lg leading-7">
                Een waterdichte epoxy coating biedt een uitstekende bescherming
                voor betonnen vloeren tegen vocht, chemicaliën en slijtage. Wij
                installeren hoogwaardige epoxy coatings die niet alleen
                waterdicht zijn, maar ook een strakke, gladde afwerking bieden.
                Deze coatings zijn ideaal voor ruimtes waar hygiëne en
                duurzaamheid belangrijk zijn, zoals garages, werkplaatsen en
                industriële omgevingen. Onze epoxy coating systemen zijn
                ontworpen om lang mee te gaan en je vloer een professionele
                uitstraling te geven. Vertrouw op ons voor een perfecte
                applicatie die je betonnen vloer optimaal beschermt.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                5. Schuine randen & loodlab
              </div>
              <div className="font-light text-lg leading-7">
                Schuine randen en loodlappen zijn belangrijk voor een goede
                waterafvoer en het voorkomen van waterinsijpeling bij betonnen
                vloeren. Wij hebben de expertise om deze elementen vakkundig te
                installeren, wat zorgt voor een effectieve afvoer van water en
                bescherming tegen vochtproblemen. Onze installaties zijn
                nauwkeurig en duurzaam, waardoor je vloer beschermd blijft tegen
                de elementen. Of het nu gaat om nieuwbouw of renovatie, wij
                zorgen ervoor dat je vloer optimaal functioneert met goed
                aangebrachte schuine randen en loodlappen.
              </div>
              <div className="mt-10">
                <Image
                  src="/images/stangelFour.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  className="rounded-md shadow-md"
                />
              </div>
              <Link href="/offerte">
                <div className="mt-10 pb-5">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Offerte aanvragen
                  </Button>
                </div>
              </Link>
              <Link href="/contact">
                <div className="">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Neem contact op
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          <DoubleScrollingTextStraight />
          <div
            id="staal"
            className="p-5 flex text-center items-center justify-start"
          >
            <div className="bg-white w-full mx-auto max-w-2xl text-start">
              <div className="text-6xl lg:text-8xl font-semibold mb-10">
                Advertenties
              </div>
              <div className="text-3xl lg:text-4xl font-medium mb-5">
                1. Vervangen stalen (UNP) balken
              </div>
              <div className="font-light text-lg leading-7">
                Stalen UNP-balken zijn essentieel voor de structuur en
                stabiliteit van vele gebouwen en constructies. Na verloop van
                tijd kunnen deze balken slijten of beschadigd raken. Wij bieden
                professionele vervangingsdiensten voor stalen UNP-balken. Ons
                team heeft de expertise om beschadigde balken veilig te
                verwijderen en te vervangen door nieuwe, hoogwaardige balken.
                Dit proces wordt zorgvuldig uitgevoerd om de structurele
                integriteit van je gebouw te waarborgen. Met onze ervaring en
                toewijding aan kwaliteit, kun je rekenen op een duurzame
                oplossing voor je stalen balken.
              </div>
              <div className="text-3xl lg:text-4xl font-medium mt-10 mb-5">
                2. Afwerken (H-balk) uithouders
              </div>
              <div className="font-light text-lg leading-7">
                H-balken zijn een veelgebruikte vorm van staal in constructies
                vanwege hun sterkte en duurzaamheid. Het afwerken van H-balken
                vereist precisie en vakmanschap. Wij bieden diensten aan voor
                het professioneel afwerken van H-balken, inclusief het
                aanbrengen van beschermende coatings en het uitvoeren van las-
                en slijpwerkzaamheden. Onze afwerking verbetert niet alleen de
                esthetiek, maar ook de levensduur en prestaties van de balken.
                Vertrouw op onze expertise voor een perfecte afwerking van je
                H-balken die bijdraagt aan de duurzaamheid en het uiterlijk van
                je constructie.
              </div>
              <div className="mt-10">
                <Image
                  src="/images/stangelTwo.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  className="rounded-md shadow-md"
                />
              </div>
              <Link href="/offerte">
                <div className="mt-10 pb-5">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Offerte aanvragen
                  </Button>
                </div>
              </Link>
              <Link href="/contact">
                <div className="">
                  <Button className="w-full bg-[#F3BD3E] hover:bg-amber-500 text-black hover:text-white hover:font-semibold hover:tracking-wider transition-all duration-300 ease-in">
                    Neem contact op
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          {/* <DoubleScrollingTextStraight /> */}
        </div>
      </div>
    </>
  );
}

export default DienstenContent;
