/**
 * components/site/ContactSection.tsx  (Server Component)
 *
 * Contactblok: links een donkere kaart met bedrijfsgegevens, openingstijden
 * en directe acties; rechts het formulier. Anker `#contactform`, zodat
 * bestaande links ("/#contactform") blijven werken.
 */

import { Clock, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "./ContactForm";
import { Container, Section, SectionHeading } from "./Layout";
import { WhatsAppIcon } from "./WhatsAppIcon";
import Reveal from "./Reveal";
import { OPENING_HOURS, SITE, formatHours } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ContactSection({ heading = true, className }: { heading?: boolean; className?: string }) {
  return (
    <Section id="contactform" aria-labelledby={heading ? "contact-title" : undefined} className={cn("scroll-mt-24", className)}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title={
                <>
                  Plan een <span className="text-gradient">kennismaking</span>
                </>
              }
              lede="Vertel ons over je plannen. We reageren binnen één werkdag, en binnen 24 uur heb je een voorstel op maat."
            />
          </Reveal>
        )}

        <div className={cn("grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6", heading && "mt-14 md:mt-16")}>
          {/* Gegevens */}
          <Reveal className="noise deep relative isolate overflow-hidden rounded-3xl border border-white/10 bg-page p-7 text-white md:p-9">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-24 -top-24 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
              <div className="absolute -bottom-32 -left-16 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Direct contact</p>
            <h3 className="mt-3 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">We denken graag met je mee</h3>

            <ul className="mt-7 space-y-3">
              {[
                { icon: Phone, label: "Bel ons", value: SITE.phone.display, href: SITE.phone.href },
                { icon: Mail, label: "Mail ons", value: SITE.email, href: `mailto:${SITE.email}` },
                {
                  icon: MapPin,
                  label: "Bezoek ons",
                  value: `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`,
                  href: SITE.address.mapsUrl,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-brand/50 hover:bg-white/[0.07]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl accent-ink">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-white/50">{label}</span>
                      <span className="block truncate text-[14px] font-medium text-white">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3.5 text-[13px] font-medium text-[#4ee28a] transition-colors hover:bg-[#25D366]/15"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Stuur ons een WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                <Clock className="h-3.5 w-3.5 text-white/55" aria-hidden />
                Openingstijden
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 text-[12.5px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {OPENING_HOURS.map((d) => (
                  <div key={d.day} className="flex justify-between gap-3">
                    <dt className="text-white/55">{d.day}</dt>
                    <dd className={d.open ? "tabular-nums text-white/90" : "text-white/40"}>{formatHours(d)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Formulier */}
          <Reveal className="card p-6 sm:p-8 md:p-10" style={{ ["--d" as string]: "120ms" }}>
            <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-ink">Stuur ons een bericht</h3>
            <p className="mt-2 text-[13.5px] text-ink-muted">Velden met een * zijn verplicht.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
