type LogoProps = {
  className?: string;
  /** "lockup" = logo horizontal completo · "isotipo" = solo el círculo. */
  variant?: "lockup" | "isotipo";
  /** "dark" = sobre fondos oscuros: el isotipo va sobre una pastilla blanca. */
  tone?: "light" | "dark";
};

/**
 * Logo de Veterinaria Animal Expert.
 * El archivo original que entregó el cliente es de baja resolución (150 px):
 * se recortó, se le quitó el fondo blanco y se reescaló. Sirve de sobra en los
 * tamaños en que se usa (40–56 px), pero conviene reemplazarlo por el vector
 * cuando el cliente lo consiga. Ver PENDIENTES.md.
 */
export default function Logo({
  className = "",
  variant = "isotipo",
  tone = "light",
}: LogoProps) {
  if (variant === "lockup") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/logo-animal-expert.png"
        alt="Veterinaria Animal Expert — Centro Médico Veterinario"
        className={`w-auto object-contain ${className}`}
      />
    );
  }

  const iso = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/isotipo-animal-expert.png"
      alt="Veterinaria Animal Expert"
      className={tone === "dark" ? "h-full w-full object-contain" : `aspect-square object-contain ${className}`}
    />
  );

  // Sobre fondo oscuro el logo se apoya en una pastilla blanca: así conserva
  // su contraste y no se ve el borde claro del recorte.
  if (tone === "dark") {
    return (
      <span className={`flex aspect-square items-center justify-center rounded-full bg-paper p-1.5 ${className}`}>
        {iso}
      </span>
    );
  }
  return iso;
}
