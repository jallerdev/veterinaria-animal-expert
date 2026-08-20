"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  id?: string;
};

/** Dropdown personalizado y elegante (reemplaza al <select> nativo). */
export default function Select({ value, onChange, options, id }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, options.indexOf(value)));
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, options, value]);

  const choose = (o: string) => {
    onChange(o);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(options[active]);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl border border-line bg-paper px-4 py-3 text-left font-body text-[15px] text-ink outline-none transition-colors hover:border-gold-soft focus:border-gold focus:ring-2 focus:ring-gold/20"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gold-deep transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-paper p-1.5 shadow-card"
        >
          {options.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-3 font-body text-[14.5px] transition-colors ${
                  selected
                    ? "bg-gold-tint font-semibold text-gold-deep"
                    : active === i
                      ? "bg-ivory text-ink"
                      : "text-ink-soft"
                }`}
              >
                <span className="truncate">{o}</span>
                {selected && (
                  <Check className="h-4 w-4 flex-shrink-0 text-gold-deep" strokeWidth={2.5} />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
