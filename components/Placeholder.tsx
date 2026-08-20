import { ImageIcon } from "lucide-react";

type PlaceholderProps = {
  label: string;
  className?: string;
  /** Tono del marco: claro (sobre fondo) u oscuro (sobre teal/oscuro). */
  tone?: "ivory" | "dark";
  /** Foto real: si se pasa un src, se muestra la imagen en vez del marcador. */
  src?: string | null;
  /** Texto alternativo de la foto (SEO/accesibilidad). */
  alt?: string;
  /** Prioriza la carga (úsalo solo en la imagen del Hero / LCP). */
  priority?: boolean;
};

/**
 * Slot de imagen: si recibe `src`, renderiza la FOTO real (object-cover, conserva
 * el aspect/redondeado del contenedor). Si no, muestra un marcador elegante que
 * indica dónde irá la foto. Así "poner fotos" = setear el src en IMAGES (content.ts).
 */
export default function Placeholder({
  label,
  className = "",
  tone = "ivory",
  src = null,
  alt = "",
  priority = false,
}: PlaceholderProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || label}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`object-cover ${className}`}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        dark
          ? "bg-[#0E1E20] text-gold-soft"
          : "bg-[linear-gradient(135deg,#EAF7F7_0%,#CFEAEA_100%)] text-gold-deep"
      } ${className}`}
      aria-hidden="true"
    >
      {/* textura sutil de líneas diagonales */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: dark
            ? "repeating-linear-gradient(135deg, rgba(212,169,81,.08) 0 1px, transparent 1px 14px)"
            : "repeating-linear-gradient(135deg, rgba(25,121,123,.16) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full border ${
            dark ? "border-gold-soft/40" : "border-gold/40"
          }`}
        >
          <ImageIcon className="h-5 w-5" strokeWidth={1.4} />
        </span>
        <span className="font-body text-[10.5px] font-semibold uppercase tracking-label">
          {label}
        </span>
      </div>
    </div>
  );
}
