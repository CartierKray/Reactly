"use client";

/**
 * components/site/offerte/OfferteDialog.tsx
 *
 * De aanvraag als venster, geopend vanaf elke offerteknop op de site (zie
 * OfferteProvider). Telefoon: schermvullend; tablet: met een kleine marge;
 * desktop: een groot, gecentreerd venster met links het overzicht en rechts de
 * vraag. Escape of het kruisje sluit het; je keuzes blijven bewaard.
 * Deze code laadt pas bij de eerste klik (of als je met de muis over een
 * offerteknop gaat), dus niet bij het openen van de pagina.
 */

import * as Dialog from "@radix-ui/react-dialog";

import OfferteWizard, { type OffertePreset } from "./OfferteWizard";

export default function OfferteDialog({
  open,
  onOpenChange,
  preset,
  presetKey,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  preset?: OffertePreset;
  presetKey: number;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[210] bg-black/60 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed inset-0 z-[211] flex flex-col overflow-hidden bg-page text-ink outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none sm:inset-4 sm:rounded-[1.75rem] sm:border sm:border-line sm:shadow-dialog lg:inset-auto lg:left-1/2 lg:top-1/2 lg:h-[min(820px,calc(100dvh-3rem))] lg:w-[min(1140px,calc(100vw-3rem))] lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <Dialog.Title className="sr-only">Offerte aanvragen</Dialog.Title>
          <OfferteWizard variant="dialog" preset={preset} presetKey={presetKey} onClose={() => onOpenChange(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
