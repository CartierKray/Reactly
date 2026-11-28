import type { Metadata } from "next";

import LegalLayout from "@/components/site/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe Reactly omgaat met je persoonsgegevens: welke gegevens we verzamelen, waarom, en welke rechten je hebt.",
  alternates: { canonical: "/privacybeleid" },
};

export default function PrivacybeleidPage() {
  return (
    <LegalLayout
      title="Privacybeleid"
      lede="Wij hechten veel waarde aan jouw privacy en gaan zorgvuldig om met je persoonsgegevens. Hier leggen we uit welke gegevens we verzamelen, waarom we dat doen en hoe we ze beschermen."
      updated="25 november 2026"
      sections={[
        {
          id: "gegevens",
          title: "Welke gegevens verzamelen we?",
          body: (
            <>
              <p>We kunnen de volgende gegevens verzamelen wanneer je onze website bezoekt of contact met ons opneemt:</p>
              <ul>
                <li>Naam en contactgegevens, zoals je e-mailadres en telefoonnummer;</li>
                <li>IP-adres en browsergegevens;</li>
                <li>Andere gegevens die je vrijwillig verstrekt via het contactformulier of de chat.</li>
              </ul>
            </>
          ),
        },
        {
          id: "doel",
          title: "Waarom verzamelen we deze gegevens?",
          body: (
            <ul>
              <li>Om onze website te verbeteren en gebruiksvriendelijker te maken;</li>
              <li>Om contact met je op te nemen als je daarom vraagt;</li>
              <li>Om wettelijke verplichtingen na te leven.</li>
            </ul>
          ),
        },
        {
          id: "beveiliging",
          title: "Hoe beschermen we jouw gegevens?",
          body: (
            <p>
              We nemen passende technische en organisatorische maatregelen om je gegevens te beveiligen tegen verlies,
              misbruik of ongeoorloofde toegang. De website draait volledig via een beveiligde verbinding (SSL).
            </p>
          ),
        },
        {
          id: "derden",
          title: "Delen we jouw gegevens met derden?",
          body: (
            <>
              <p>
                We delen je gegevens niet met derden, tenzij dat nodig is voor de uitvoering van onze diensten of
                wettelijk verplicht is. Voor de werking van deze website gebruiken we de volgende dienstverleners:
              </p>
              <ul>
                <li>
                  <strong>Resend</strong>: verstuurt aanvragen uit onze formulieren en de chat naar ons, en de
                  bevestigingsmail naar jou;
                </li>
                <li>
                  <strong>EmailJS</strong>: reserveroute voor het versturen van aanvragen als Resend niet beschikbaar is;
                </li>
                <li>
                  <strong>Anthropic</strong> (Claude): beantwoordt vragen die je in de chat stelt, inclusief foto&apos;s
                  of pdf&apos;s die je daar zelf deelt; <strong>OpenAI</strong> wordt alleen als reserve gebruikt;
                </li>
                <li>
                  <strong>Vercel</strong>: host de website;
                </li>
                <li>
                  <strong>Google</strong>: statistieken en advertenties, alleen na jouw toestemming.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: (
            <p>
              We bewaren alleen wat nodig is om de site te laten werken, zoals je themakeuze en je cookievoorkeur.
              Analytische en marketingcookies plaatsen we pas na jouw toestemming. Je kunt je keuze altijd wijzigen via
              &ldquo;Cookie-instellingen&rdquo; onderaan elke pagina.
            </p>
          ),
        },
        {
          id: "rechten",
          title: "Jouw rechten",
          body: (
            <p>
              Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact
              met ons op via <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Vragen over dit privacybeleid? Neem contact op met {SITE.name}, {SITE.address.street},{" "}
              {SITE.address.postalCode} {SITE.address.city}, via <a href={`mailto:${SITE.email}`}>{SITE.email}</a> of{" "}
              <a href={SITE.phone.href}>{SITE.phone.display}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
