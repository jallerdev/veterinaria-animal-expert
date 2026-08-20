"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ, FAQ_META } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Acordeón accesible de preguntas frecuentes.
 * - Cada pregunta es un <button> con aria-expanded y aria-controls.
 * - El panel de respuesta usa role="region" y aria-labelledby.
 * - Lee de `FAQ` (content.ts); el JSON-LD FAQPage se emite en <JsonLd />.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  if (FAQ.length === 0) return null;

  return (
    <section id="preguntas" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[820px]">
        <SectionHeading
          eyebrow={FAQ_META.eyebrow}
          title={FAQ_META.title}
          subtitle={FAQ_META.subtitle}
        />

        <Reveal className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-line bg-ivory shadow-soft"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[16px] font-semibold leading-snug text-ink transition-colors hover:text-gold-deep sm:px-6 sm:py-5 sm:text-[17px]"
                  >
                    {item.q}
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold-deep"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="h-[18px] w-[18px]" />
                      ) : (
                        <Plus className="h-[18px] w-[18px]" />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 font-body text-[14.5px] leading-[1.7] text-muted sm:px-6 sm:text-[15px]"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
