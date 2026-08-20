import { STATS } from "@/content";

export default function Stats() {
  return (
    <section className="border-y border-line bg-ivory">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-4">
        {STATS.map((s, i) => {
          // At 2-col: border-r on 1st and 3rd items (even index); at 4-col: border-r on all but last
          const isEven = i % 2 === 0;
          const isLast = i === STATS.length - 1;
          return (
            <div
              key={s.label}
              className={`flex flex-col items-center px-4 py-4 text-center sm:px-6 sm:py-5 lg:py-0 ${
                isEven ? "border-r border-line" : ""
              } ${isLast ? "lg:border-r-0" : "lg:border-r lg:border-line"}`}
            >
              <div className="font-display text-[clamp(24px,4vw,40px)] font-semibold leading-none text-gold-deep">
                {s.value}
              </div>
              <div className="mt-2 max-w-[140px] font-body text-[12.5px] font-medium text-muted sm:max-w-[160px] sm:text-[13px]">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
