"use client";

/**
 * components/site/Chat.tsx
 *
 * De chatknop rechtsonder en de AI-chat, zoals bij BeterLease:
 *  - de knop is klein en direct beschikbaar, in het accent van het thema
 *    (blauw in licht, beige in donker), met een "1"-badge erbovenop;
 *  - na 15 seconden verschijnt eenmalig een ballonnetje "Wist je dat?";
 *  - de chat zelf (markdown, formulieren) laadt pas bij de eerste klik en
 *    blijft daarna gemount, zodat het gesprek bewaard blijft;
 *  - andere knoppen op de site openen de chat via `openChat()`.
 */

import * as React from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

import { OPEN_CHAT_EVENT } from "./chat/open";
import { cn } from "@/lib/utils";

const ChatBox = dynamic(() => import("./chat/ChatBox"), { ssr: false });

const DISMISS_KEY = "reactly_chat_popup_dismissed";

export default function Chat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [bubble, setBubble] = React.useState(false);

  // Ballonnetje eenmalig, 15 s na het laden, tenzij eerder gesloten.
  React.useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setBubble(true), 15000);
    return () => window.clearTimeout(t);
  }, []);

  const dismissBubble = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* geen opslag: dan alleen voor dit bezoek */
    }
    setBubble(false);
  };

  const openChat = React.useCallback(() => {
    setMounted(true);
    setIsOpen(true);
    setBubble(false);
  }, []);

  React.useEffect(() => {
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openChat);
  }, [openChat]);

  const onClick = () => {
    dismissBubble();
    if (isOpen) setIsOpen(false);
    else openChat();
  };

  return (
    <>
      {mounted && <ChatBox isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* Ballonnetje boven de knop */}
      {bubble && !isOpen && (
        <div className="enter fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-[110]" style={{ ["--in-y" as string]: "10px" }}>
          <div className="relative w-56 rounded-2xl border border-line bg-surface-elevated p-4 text-ink shadow-dialog">
            <button
              type="button"
              onClick={dismissBubble}
              aria-label="Sluiten"
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-[14px] leading-none text-page shadow-md"
            >
              &times;
            </button>
            <p className="text-sm font-semibold">Wist je dat?</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              Onze AI-assistent beantwoordt je vragen over websites en marketing, dag en nacht.
            </p>
            <span aria-hidden className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-line bg-surface-elevated" />
          </div>
        </div>
      )}

      {/* Chatknop, met de badge ernaast in dezelfde houder (erboven, niet erachter). */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[110]">
        {!isOpen && (
          <span aria-hidden className="pointer-events-none absolute -right-1 -top-1 z-10 flex h-[22px] w-[22px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#dc2626] shadow-[0_2px_8px_rgba(0,0,0,0.35)] ring-2 ring-[#dc2626]">
              1
            </span>
          </span>
        )}
        <button
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Chat sluiten" : "Chat openen"}
          className={cn(
            "accent-fill group relative grid h-14 w-14 place-items-center overflow-hidden rounded-full transition-transform duration-300 ease-premium hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page",
            "shadow-[0_10px_30px_-6px_rgb(var(--glow-rgb)/0.65),inset_0_1px_0_rgba(255,255,255,0.3)]",
          )}
        >
          {/* Glans bij hover, zoals op de CTA-knoppen. */}
          <span aria-hidden className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.35)_50%,transparent_80%)] transition-transform duration-700 group-hover:translate-x-full" />
          {isOpen ? (
            <ChevronDown className="relative h-6 w-6" aria-hidden />
          ) : (
            <svg aria-hidden viewBox="0 0 28 32" width="24" height="28" className="relative" fill="currentColor">
              <path d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0 C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32 Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333 C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333 5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095 4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415 C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168 7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168 23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507 C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
