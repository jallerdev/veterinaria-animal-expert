import { WHY } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(25,121,123,.18),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow={WHY.eyebrow}
          title={WHY.title}
          subtitle={WHY.subtitle}
          dark
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.items.map(({ icon: Icon, title, desc }, i) => (
            <Reveal
              key={title}
              delay={i * 60}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-6 transition-colors hover:border-gold-soft/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-soft/40 text-gold-soft">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 font-display text-[19px] font-semibold text-paper">
                {title}
              </h3>
              <p className="mt-2 font-body text-[14px] leading-[1.6] text-paper/65">
                {desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
