/**
 * app/template.tsx
 *
 * Paginaovergang: bij elke navigatie wordt deze template opnieuw gemount,
 * waardoor de nieuwe pagina zacht invaagt en een stukje omhoog schuift (pure
 * CSS, `.page-enter` in globals.css). Navbar en footer staan in de layout en
 * blijven dus rustig staan.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
