/**
 * components/site/chat/open.ts
 *
 * De chat staat in de root layout; knoppen die hem willen openen staan
 * elders (contactpagina, footer). Een gebeurtenis op `window` overbrugt dat
 * zonder een context-provider om de hele site.
 */

export const OPEN_CHAT_EVENT = "reactly:open-chat";

/** Opent de chat rechtsonder, vanaf elke plek in de pagina. */
export function openChat(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
}
