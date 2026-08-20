import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { SITE, NAV, FOOTER } from "@/content";
import Logo from "./Logo";

const socialCls =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-soft no-underline transition-colors hover:border-gold-soft/60 hover:bg-white/5";

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-10 pt-14 text-paper sm:px-6 sm:pb-8 sm:pt-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" tone="dark" />
            <div className="leading-tight">
              <div className="font-display text-[20px] font-semibold text-paper">
                {SITE.name}
              </div>
              <div className="font-body text-[9.5px] font-semibold uppercase tracking-label text-gold-soft">
                {SITE.title} · {SITE.tagline}
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-[320px] font-body text-[14.5px] leading-[1.7] text-paper/60">
            {FOOTER.description}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.instagram.url} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className={socialCls}>
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a href={SITE.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className={socialCls}>
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        {/* Navega */}
        <div>
          <div className="font-body text-[11px] font-semibold uppercase tracking-label text-gold-soft">
            {FOOTER.navTitle}
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {NAV.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-[14.5px] text-paper/70 no-underline transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Visítanos */}
        <div>
          <div className="font-body text-[11px] font-semibold uppercase tracking-label text-gold-soft">
            {FOOTER.visitTitle}
          </div>
          <div className="mt-4 flex flex-col gap-3 font-body text-[14.5px] text-paper/70">
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-soft" />
              <span>
                {SITE.address.short} · {SITE.address.extra}
              </span>
            </span>
            <span className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-soft" />
              <span>
                {SITE.hours[0].day}: {SITE.hours[0].time}
                <br />
                {SITE.hours[1].day}: {SITE.hours[1].time}
              </span>
            </span>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gold-soft no-underline hover:text-paper"
            >
              <MessageCircle className="h-4 w-4" /> {FOOTER.whatsappLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 font-body text-[12.5px] text-paper/45 sm:mt-12 sm:flex-row">
        <span>© 2026 {FOOTER.copyright}</span>
        <span>{SITE.instagram.handle}</span>
      </div>
    </footer>
  );
}
