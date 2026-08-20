import { Check, Star } from "lucide-react";
import { ABOUT, SITE, IMAGES } from "@/content";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";

export default function About() {
  return (
    <section id="sobre-mi" className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        {/* Retrato */}
        <Reveal className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[32px] border border-gold-soft/60" />
          <Placeholder
            src={IMAGES.about.src}
            alt={IMAGES.about.alt}
            label={`Dr. ${SITE.name} · Clínica veterinaria en ${SITE.address.short}`}
            className="aspect-[4/5] w-full rounded-[26px] shadow-card"
          />
          <div className="absolute -right-2 bottom-6 flex items-center gap-2.5 rounded-2xl bg-gold px-4 py-3 text-white shadow-gold sm:-right-4 sm:bottom-8 sm:gap-3 sm:px-5 sm:py-4">
            <Star className="h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" strokeWidth={1.6} />
            <span className="font-body text-[10px] font-semibold uppercase leading-tight tracking-label sm:text-[11px]">
              {ABOUT.badgeLine1}
              <br />
              {ABOUT.badgeLine2}
            </span>
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal>
          <p className="gold-rule flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-label text-gold-deep">
            {ABOUT.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.12] text-ink">
            {ABOUT.titleA}
            <br />
            <span className="italic text-gold-deep">{ABOUT.titleEmphasis}</span>
          </h2>
          {ABOUT.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mt-5 font-body text-[16.5px] leading-[1.75] text-ink-soft first:mt-5 [&:not(:first-of-type)]:mt-4"
            >
              {p}
            </p>
          ))}

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ABOUT.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="font-body text-[14.5px] leading-[1.5] text-ink-soft">
                  {c}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-display text-[28px] italic text-gold-deep">
            {ABOUT.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
