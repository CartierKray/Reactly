import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function FooterAccordion() {
  return (
    <>
      <div className="flex w-[90%] mx-auto mb-[50px] xl:hidden text-gray-300">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ontdek</AccordionTrigger>
            <AccordionContent className="text-[15px] text-start font-extralight">
              <a>Financial lease</a>
              <br />
              <a>Operational Lease</a>
              <br />
              <a>Private Lease</a>
              <br />
              <a>Short Lease</a>
              <br />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Contact</AccordionTrigger>
            <AccordionContent className="text-[15px] text-start font-extralight">
              Wij zijn 7 dagen per week geopend en zijn 24/7 online bereikbaar
              voor hulp en al uw vragen. U kunt ons ook een WhatsApp bericht
              sturen en ons team zal u binnen 2 werkuren terug contacteren. wilt
              u eerder contact? Belt u ons dan gerust op.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Cookiebeleid</AccordionTrigger>
            <AccordionContent className="text-[15px] text-start font-extralight">
              Bekijk hier ons cookiebeleid
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Privacyverklaring</AccordionTrigger>
            <AccordionContent className="text-[15px] text-start font-extralight">
              Bekijk hier ons privacybeleid
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Algemene voorwaarden</AccordionTrigger>
            <AccordionContent className="text-[15px] text-start font-extralight">
              Bekijk hier ons algemene voorwaarden.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default FooterAccordion;
