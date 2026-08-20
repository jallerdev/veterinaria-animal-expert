"use client";

import { useEffect, useState } from "react";
import { Star, ArrowLeft, ArrowRight, Quote, ExternalLink } from "lucide-react";
import { TESTIMONIALS, GOOGLE } from "@/content";
import SectionHeading from "./SectionHeading";

const COUNT = TESTIMONIALS.items.length;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % COUNT), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setActive((i) => (i + COUNT - 1) % COUNT);
  const next = () => setActive((i) => (i + 1) % COUNT);

  return (
    <section id="testimonios" className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <SectionHeading eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} />

        <div className="relative mt-12">
          {TESTIMONIALS.items.map((t, i) => (
            <div
              key={i}
              aria-hidden={active !== i}
              className={`inset-0 rounded-3xl border border-line bg-paper p-6 text-center shadow-soft transition-opacity duration-500 sm:p-10 ${
                i === 0 ? "relative" : "absolute"
              } ${active === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <Quote className="mx-auto h-9 w-9 text-gold-soft" fill="#9ADADB" />
              <div className="mt-5 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 text-gold" fill="#19797B" />
                ))}
              </div>
              <p className="mx-auto mt-5 max-w-[640px] font-display text-[clamp(18px,2.2vw,24px)] italic leading-[1.55] text-ink">
                “{t.quote}”
              </p>
              <div className="mt-6">
                <div className="font-body text-[15px] font-semibold text-gold-deep">
                  {t.name}
                </div>
                <div className="mt-0.5 font-body text-[13px] text-muted">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold-deep transition-colors hover:border-gold hover:bg-paper"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.items.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Testimonio ${i + 1}`}
                aria-current={active === i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-7 bg-gold" : "w-2 bg-gold-soft"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold-deep transition-colors hover:border-gold hover:bg-paper"
          >
            <ArrowRight className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* Agregado real de Google — solo si hay reseñas reales */}
        {GOOGLE.reviewCount > 0 && (
          <div className="mt-9 flex justify-center">
            <a
              href={GOOGLE.mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-body text-[14px] font-semibold text-gold-deep no-underline shadow-soft transition-colors hover:border-gold"
            >
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 text-gold" fill="#19797B" />
                ))}
              </span>
              {GOOGLE.rating.toFixed(1)} · {GOOGLE.reviewCount} reseñas en Google
              <ExternalLink className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-gold-deep" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
