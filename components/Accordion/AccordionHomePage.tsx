import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionHomePage() {
  return (
    <div className="mb-20 xl:mb-36 mt-10 w-full text-white">
      <p className="w-full text-start pl-6 md:pl-8 xl:pl-20 mb-10 pb-3 text-4xl xl:text-5xl font-semibold">
        Veel gestelde <span className="text-[#f00]">vragen</span>
      </p>
      {/* <div className="w-fit mb-10">
        <p className="text-[12px] text-green-500 pl-8 xl:pl-20 pb-0.5 uppercase tracking-wider">
          FAQ
        </p>
      </div> */}
      <Accordion
        type="single"
        collapsible
        className="mx-auto w-[85%] md:w-[80%]"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Wat is financial lease?</AccordionTrigger>
          <AccordionContent>
            Financial lease is een leasevorm waarbij u economisch eigenaar van
            het voertuig wordt. Dit betekent dat u de auto na de leaseperiode
            volledig in bezit krijgt na betaling van de laatste termijn. U
            betaalt maandelijks een vast bedrag en profiteert van
            belastingvoordelen zoals btw-aftrek.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Wat is operational lease?</AccordionTrigger>
          <AccordionContent>
            Bij operational lease blijft de leasemaatschappij juridisch en
            economisch eigenaar van de auto. U betaalt een vast maandbedrag
            waarin kosten zoals onderhoud, verzekering en wegenbelasting zijn
            inbegrepen. Aan het einde van het contract levert u de auto gewoon
            weer in.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Wat zijn de voordelen van financial lease?
          </AccordionTrigger>
          <AccordionContent>
            Financial lease biedt voordelen zoals btw-aftrek, vaste maandelijkse
            kosten en de mogelijkheid om de auto als eigendom te krijgen aan het
            einde van de looptijd. Het is vooral aantrekkelijk voor ondernemers
            die willen investeren zonder een grote uitgave vooraf.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Voor wie is operational lease geschikt?
          </AccordionTrigger>
          <AccordionContent>
            Operational lease is ideaal voor bedrijven en particulieren die geen
            omkijken willen hebben naar bijkomende kosten zoals onderhoud en
            verzekering. Het is ook geschikt als u regelmatig een nieuwe auto
            wilt rijden.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Wat gebeurt er aan het einde van een operational leasecontract?
          </AccordionTrigger>
          <AccordionContent>
            Aan het einde van een operational leasecontract levert u de auto in
            bij de leasemaatschappij. In sommige gevallen heeft u de optie om de
            auto over te nemen tegen een restwaarde.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            Is financial lease mogelijk voor tweedehands autos?
          </AccordionTrigger>
          <AccordionContent>
            Ja, financial lease is ook beschikbaar voor tweedehands autos. Dit
            maakt het een aantrekkelijke optie voor ondernemers die kosten
            willen besparen en toch een betrouwbare auto willen rijden.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            Wat gebeurt er als ik mijn contract vroegtijdig wil beëindigen?
          </AccordionTrigger>
          <AccordionContent>
            Vroegtijdige beëindiging van een leasecontract kan extra kosten met
            zich meebrengen. Bij Alpha Lease kun je boetevrij vroegtijdig je
            contract aflossen, dit biedt speling in de looptijd terwijl je kan
            genieten van de laagste tarieven. Neem contact op met één van onze
            professionals waarmee u uw wensen en behoeftes kunt bespreken. zo
            kunnen wij een passend op maat gemaakt aanbod en plan voor u
            opstellen voor uw nieuwe leaseauto.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
