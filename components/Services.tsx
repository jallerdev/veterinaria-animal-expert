import { SERVICES } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="servicios" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={SERVICES.eyebrow}
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.items.map(({ icon: Icon, name, desc, group }, i) => (
            <Reveal
              key={name}
              delay={(i % 4) * 60}
              className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-tint text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <span className="mt-2.5 font-body text-[10px] font-semibold uppercase tracking-label text-faint">
                {group}
              </span>
              <h3 className="mt-1 font-display text-[20px] font-semibold text-ink">
                {name}
              </h3>
              <p className="mt-2 font-body text-[14.5px] leading-[1.6] text-muted">
                {desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
