import { SERVICES } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Sección de PRECIOS — pieza propia del arquetipo "Salud & Confianza".
 * Lee SERVICES y muestra cada servicio con su `priceFrom`. Precios "desde",
 * porque el valor final depende del servicio concreto.
 */
export default function Precios() {
  return (
    <section id="precios" className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[920px]">
        <SectionHeading
          eyebrow="Precios"
          title="Precios claros, sin sorpresas"
          subtitle="Una idea de lo que cuestan nuestros servicios. El valor final depende de lo que necesites; te lo confirmamos al agendar."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.items.map(({ icon: Icon, name, group, priceFrom, desc }, i) => (
            <Reveal
              key={name}
              delay={(i % 2) * 70}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft hover:shadow-card"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>

              <div className="min-w-0 flex-1">
                <span className="font-body text-[10px] font-semibold uppercase tracking-label text-faint">
                  {group}
                </span>
                <h3 className="font-display text-[18px] font-semibold leading-tight text-ink sm:text-[19px]">
                  {name}
                </h3>
                <p className="mt-0.5 line-clamp-2 font-body text-[13px] leading-[1.5] text-muted sm:text-[13.5px]">
                  {desc}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                {priceFrom.startsWith("$") && (
                  <span className="block font-body text-[10px] font-semibold uppercase tracking-label text-faint">
                    Desde
                  </span>
                )}
                <span className="font-display text-[20px] font-semibold leading-none text-gold-deep sm:text-[22px]">
                  {priceFrom}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="font-body text-[13.5px] text-faint">
            Precios desde; el valor final depende del servicio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
