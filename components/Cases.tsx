import { Instagram, ArrowUpRight } from "lucide-react";
import { CASES, SITE, IMAGES } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Placeholder from "./Placeholder";

/**
 * Galería de casos clínicos reales. Los casos que están publicados en Instagram
 * traen `href`: la tarjeta completa se vuelve un enlace a la publicación y
 * muestra el distintivo de Instagram sobre la foto.
 */
export default function Cases() {
  return (
    <section id="casos" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={CASES.eyebrow}
          title={CASES.title}
          subtitle={CASES.subtitle}
        />
        <Reveal className="mx-auto mt-4 max-w-[640px] text-center">
          <p className="font-body text-[13.5px] font-medium text-gold-deep">
            {CASES.caption}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.items.map((c, i) => {
            const media = (
              <div className="group relative overflow-hidden rounded-[24px] border border-line shadow-card">
                <Placeholder
                  src={IMAGES.gallery[i]?.src ?? null}
                  alt={IMAGES.gallery[i]?.alt ?? c.title}
                  label={`${c.title} en ${SITE.name}, ${SITE.address.short}`}
                  className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-105"
                />
                {c.href && (
                  <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 font-body text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Instagram className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {CASES.postLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                )}
              </div>
            );

            return (
              <Reveal key={c.title} delay={i * 70}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                    aria-label={`${c.title} — ${CASES.postLabel} en Instagram`}
                  >
                    {media}
                  </a>
                ) : (
                  media
                )}

                <div className="px-1 pt-4">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-label text-faint">
                    {c.tag}
                  </span>
                  <h3 className="mt-1 font-display text-[18px] font-semibold leading-tight text-ink">
                    {c.title}
                  </h3>
                  {c.desc && (
                    <p className="mt-1.5 font-body text-[13.5px] leading-[1.55] text-muted">
                      {c.desc}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="font-body text-[13.5px] text-faint">{CASES.note}</p>
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-body text-[14px] font-semibold text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep"
          >
            <Instagram className="h-[18px] w-[18px]" strokeWidth={1.7} />
            {CASES.ctaLabel} {SITE.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
