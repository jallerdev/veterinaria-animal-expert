import { PROCESS } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow={PROCESS.eyebrow}
          title={PROCESS.title}
          subtitle={PROCESS.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {PROCESS.steps.map((p, i) => (
            <Reveal key={p.step} delay={i * 70} className="relative">
              <div className="font-display text-[44px] font-semibold leading-none text-gold-soft sm:text-[52px]">
                {p.step}
              </div>
              <h3 className="mt-2 font-display text-[19px] font-semibold text-ink sm:text-[20px]">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-[14.5px] leading-[1.6] text-muted">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
