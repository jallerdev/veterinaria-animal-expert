import { Sparkles, MapPin, CalendarDays, ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { HERO, GOOGLE, SITE, IMAGES } from "@/content";
import Placeholder from "./Placeholder";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(25,121,123,.16),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        {/* Texto */}
        <div className="min-w-0">
          <p className="gold-rule mb-5 flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-label text-gold-deep">
            {HERO.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(34px,6vw,68px)] font-semibold leading-[1.05] text-ink">
            {HERO.titleA}
            <br />
            {HERO.titleB}{" "}
            <span className="italic text-gold-deep">{HERO.titleEmphasis}</span>.
          </h1>
          <p className="mt-5 max-w-[480px] font-body text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-muted">
            {HERO.subcopy}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="/#agenda"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 font-body text-[15px] font-semibold text-white no-underline shadow-gold transition-colors hover:bg-gold-deep sm:w-auto sm:justify-start"
            >
              <CalendarDays className="h-[18px] w-[18px]" /> {HERO.ctaPrimary}
            </a>
            <a
              href="/#servicios"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-[15px] font-body text-[15px] font-semibold text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep sm:w-auto sm:justify-start"
            >
              {HERO.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            {GOOGLE.phoneIntl && (
              <a
                href={`tel:${GOOGLE.phoneIntl}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-[15px] font-body text-[15px] font-semibold text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep sm:w-auto sm:justify-start"
              >
                <Phone className="h-[18px] w-[18px]" /> Llamar
              </a>
            )}
          </div>

          {/* Distintivo de confianza */}
          {SITE.trustBadge && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-soft bg-gold-tint px-4 py-2 font-body text-[13px] font-semibold text-gold-deep">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              {SITE.trustBadge}
            </div>
          )}

          {/* Credibilidad */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 font-body text-[14px] text-muted">
            <span className="flex items-center gap-2">
              <Sparkles className="h-[18px] w-[18px] flex-shrink-0 text-gold-deep" />
              {HERO.cred1}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-[18px] w-[18px] flex-shrink-0 text-gold-deep" />
              {HERO.cred2}
            </span>
          </div>
        </div>

        {/* Retrato */}
        <div className="relative mt-2 lg:mt-0">
          <div className="absolute -inset-3 -z-10 rounded-[32px] bg-gold-tint" />
          <Placeholder
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            priority
            label={`Clínica veterinaria ${SITE.name} en ${SITE.address.short}`}
            className="aspect-[4/5] w-full rounded-[28px] border border-gold-soft/50 shadow-lift"
          />
          {/* Badge: positioned inside the container on mobile to avoid viewport overflow */}
          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-card sm:-bottom-6 sm:-left-6 sm:gap-4 sm:px-5 sm:py-4">
            <span className="font-display text-[24px] font-semibold leading-none text-gold-deep sm:text-[30px]">
              {HERO.badgeValue}
            </span>
            <span className="whitespace-pre-line font-body text-[12px] font-medium leading-tight text-muted sm:text-[13px]">
              {HERO.badgeLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
