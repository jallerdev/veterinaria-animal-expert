"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Placeholder from "./Placeholder";

type Props = {
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc?: string;
  afterSrc?: string;
  className?: string;
};

/**
 * Comparador "Antes / Después" deslizable (como el del spa): arrastra la barra
 * — o usa las flechas del teclado — para revelar el después sobre el antes.
 * Usa clip-path para que ambas imágenes queden perfectamente alineadas.
 */
export default function BeforeAfter({
  beforeLabel = "Antes",
  afterLabel = "Después",
  beforeSrc,
  afterSrc,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [pct, setPct] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(2, Math.min(98, p));
    setPct(p);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  const onDown = (e: React.PointerEvent) => {
    // En táctil dejamos que la página haga scroll; se arrastra con la manija.
    if (e.pointerType !== "mouse") return;
    dragging.current = true;
    setFromClientX(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(2, p - 4));
    if (e.key === "ArrowRight") setPct((p) => Math.min(98, p + 4));
  };

  const layer = (
    label: string,
    src: string | undefined,
    position: "left" | "right",
  ) => (
    <>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <Placeholder label={label} className="absolute inset-0 h-full w-full" />
      )}
      <span
        className={`absolute top-3 ${
          position === "left" ? "left-3 bg-ink/70" : "right-3 bg-gold"
        } rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-label text-white`}
      >
        {label}
      </span>
    </>
  );

  return (
    <div
      ref={wrapRef}
      onPointerDown={onDown}
      className={`relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-[24px] border border-line shadow-card ${className}`}
    >
      {/* Después (capa base, completa) */}
      <div className="absolute inset-0">{layer(afterLabel, afterSrc, "right")}</div>

      {/* Antes (recortado a pct% por la izquierda) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        {layer(beforeLabel, beforeSrc, "left")}
      </div>

      {/* Línea divisoria */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(25,121,123,.7)]"
        style={{ left: `calc(${pct}% - 1px)` }}
      />

      {/* Manija */}
      <button
        type="button"
        role="slider"
        aria-label="Comparar antes y después"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        onPointerDown={(e) => {
          e.stopPropagation();
          dragging.current = true;
        }}
        onKeyDown={onKey}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none cursor-ew-resize items-center justify-center rounded-full border-2 border-gold bg-white text-gold-deep shadow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        style={{ left: `${pct}%` }}
      >
        <ChevronLeft className="h-4 w-4 -mr-1" strokeWidth={2.5} />
        <ChevronRight className="h-4 w-4 -ml-1" strokeWidth={2.5} />
      </button>
    </div>
  );
}
