import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
};

/** Encabezado de sección reutilizable: eyebrow dorado + título Playfair + subtítulo. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  dark = false,
}: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-[640px] text-center" : "max-w-[640px]"}>
      <p
        className={`${center ? "gold-rule justify-center" : "gold-rule"} flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-label ${
          dark ? "text-gold-soft" : "text-gold-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[clamp(26px,4vw,46px)] font-semibold leading-[1.1] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-body text-[15px] leading-[1.7] sm:text-[16px] ${
            dark ? "text-paper/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
