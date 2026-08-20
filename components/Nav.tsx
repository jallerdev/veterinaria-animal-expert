"use client";

import { useEffect, useState } from "react";
import { Menu, X, CalendarHeart } from "lucide-react";
import { NAV, SITE } from "@/content";
import Logo from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      {/* En escritorio es una grilla de 3 columnas (logo · enlaces · CTA) para que
          los enlaces queden centrados de verdad y no desplazados por el ancho del
          logo. En móvil sigue siendo flex: logo a un lado, botón de menú al otro. */}
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="/"
          className="flex min-w-0 items-center no-underline lg:justify-self-start"
          onClick={close}
        >
          {/* El logo ya trae el nombre y "Centro Médico Veterinario": no se repite en texto. */}
          <Logo variant="lockup" className="h-10 flex-shrink-0 sm:h-12" />
          <span className="sr-only">{SITE.name}</span>
        </a>

        {/* Enlaces — columna del centro */}
        <div className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
          {NAV.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap font-body text-[15px] font-medium text-ink-soft no-underline transition-colors hover:text-gold-deep"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA — columna derecha */}
        <a
          href="/#agenda"
          className="hidden flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 py-2.5 font-body text-[14.5px] font-semibold text-white no-underline shadow-gold transition-colors hover:bg-gold-deep lg:flex lg:justify-self-end"
        >
          <CalendarHeart className="h-4 w-4 flex-shrink-0" /> {NAV.cta}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className="overflow-hidden bg-paper/95 backdrop-blur-md transition-[max-height] duration-300 ease-in-out lg:hidden"
        style={{ maxHeight: open ? 420 : 0 }}
      >
        <div className="flex flex-col gap-0.5 border-t border-line px-5 pb-5 pt-2">
          {NAV.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="rounded-lg px-3 py-3.5 font-body text-[15px] font-medium text-ink-soft no-underline transition-colors hover:bg-ivory hover:text-gold-deep"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#agenda"
            onClick={close}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 font-body text-[15px] font-semibold text-white no-underline"
          >
            <CalendarHeart className="h-[18px] w-[18px]" /> {NAV.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
