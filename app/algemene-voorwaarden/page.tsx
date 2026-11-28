import type { Metadata } from "next";

import LegalLayout from "@/components/site/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden en disclaimer van Reactly, webdesign & online marketing bureau.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalLayout
      title="Algemene voorwaarden"
      lede="Door gebruik te maken van de diensten van Reactly ga je akkoord met onze algemene voorwaarden en de disclaimer. Deze voorwaarden gelden voor alle offertes, overeenkomsten en diensten."
      updated="25 november 2026"
      sections={[
        {
          id: "toepasselijkheid",
          title: "Toepasselijkheid",
          body: (
            <p>
              Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van {SITE.name}, tenzij
              schriftelijk anders is overeengekomen.
            </p>
          ),
        },
        {
          id: "offertes",
          title: "Offertes en overeenkomsten",
          body: (
            <p>
              Offertes zijn vrijblijvend, tenzij anders vermeld. Een overeenkomst komt tot stand zodra je een offerte
              schriftelijk of per e-mail accepteert. In de offerte staan de afgesproken werkzaamheden, planning en
              investering.
            </p>
          ),
        },
        {
          id: "annulering",
          title: "Annulering",
          body: (
            <p>
              We hanteren duidelijke annuleringsvoorwaarden. De voorwaarden die voor jouw project gelden, staan in de
              offerte of overeenkomst.
            </p>
          ),
        },
        {
          id: "betaling",
          title: "Prijzen en betaling",
          body: (
            <ul>
              <li>We werken met transparante prijzen; je weet vooraf waar je aan toe bent.</li>
              <li>Betalingstermijnen en incassoregels staan op de factuur en in de overeenkomst.</li>
            </ul>
          ),
        },
        {
          id: "volledige-voorwaarden",
          title: "Volledige voorwaarden",
          body: (
            <p>
              Wil je de volledige voorwaarden ontvangen? Mail ons via <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
              of bel <a href={SITE.phone.href}>{SITE.phone.display}</a>; we sturen ze je direct toe.
            </p>
          ),
        },
        {
          id: "disclaimer",
          title: "Disclaimer",
          body: (
            <>
              <p>
                Door deze website te bekijken en de daarop geboden informatie te gebruiken, verklaar je akkoord te zijn
                met deze disclaimer. Het gebruik van deze website is voor eigen risico.
              </p>
              <p>
                {SITE.name} kan niet aansprakelijk worden gesteld voor fouten, onvolledige informatie of wijzigingen in
                de voorwaarden. Controleer regelmatig de nieuwste versie van de voorwaarden.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
