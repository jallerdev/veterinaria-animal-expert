"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  CreditCard,
  Copy,
  Check,
  Phone,
  Navigation,
} from "lucide-react";
import { SITE, CONTACT, SERVICES, GOOGLE } from "@/content";
import Reveal from "./Reveal";
import Select from "./Select";

const MAP_SRC = GOOGLE.geo
  ? `https://www.google.com/maps?q=${GOOGLE.geo.lat},${GOOGLE.geo.lng}&z=16&output=embed`
  : "";

const SERVICE_OPTS = [
  CONTACT.firstServiceOption,
  ...SERVICES.items.map((s) => s.name),
];

const fieldCls =
  "w-full min-h-[44px] rounded-xl border border-line bg-paper px-4 py-3 font-body text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-gold focus:ring-2 focus:ring-gold/20";
const labelCls =
  "mb-1.5 block font-body text-[12px] font-semibold uppercase tracking-label text-gold-deep";

export default function Contact() {
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICE_OPTS[0]);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const message = [
    "¡Hola! ✨ Quiero agendar una cita.",
    "",
    `• Nombre: ${name.trim() || "—"}`,
    `• Interés: ${service}`,
    note.trim() ? `• Cuéntanos: ${note.trim()}` : "",
    "",
    "¿Me confirman disponibilidad? ¡Gracias!",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const handleClick = () => {
    try {
      navigator.clipboard?.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard no disponible: igual abrimos WhatsApp */
    }
  };

  return (
    <section id="contacto" className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Info */}
        <Reveal>
          <p className="gold-rule flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-label text-gold-deep">
            {CONTACT.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] text-ink">
            {CONTACT.titleA}
            <br />
            <span className="italic text-gold-deep">{CONTACT.titleEmphasis}</span>
          </h2>
          <p className="mt-5 max-w-[460px] font-body text-[16px] leading-[1.7] text-muted">
            {CONTACT.subcopy}
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-deep">
                <MapPin className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <div className="font-body text-[12px] font-semibold uppercase tracking-label text-faint">
                  Dirección
                </div>
                {SITE.address.lines.map((l) => (
                  <div key={l} className="font-body text-[15px] text-ink-soft">
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-deep">
                <Clock className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <div className="font-body text-[12px] font-semibold uppercase tracking-label text-faint">
                  Horarios
                </div>
                {SITE.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex flex-col gap-0.5 font-body text-[15px] text-ink-soft sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span>{h.day}</span>
                    <span className="whitespace-nowrap text-muted">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-deep">
                <Instagram className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <div className="font-body text-[12px] font-semibold uppercase tracking-label text-faint">
                  Instagram
                </div>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[15px] text-ink-soft no-underline hover:text-gold-deep"
                >
                  {SITE.instagram.handle}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-deep">
                <CreditCard className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <div className="font-body text-[12px] font-semibold uppercase tracking-label text-faint">
                  Formas de pago
                </div>
                <ul className="font-body text-[15px] text-ink-soft">
                  {SITE.payments.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mapa + cómo llegar + llamar — solo cuando hay datos reales del negocio */}
          {(MAP_SRC || GOOGLE.mapsUri || GOOGLE.phoneIntl) && (
            <div className="mt-8">
              {MAP_SRC && (
                <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
                  <iframe
                    title={`Ubicación en Google Maps · ${SITE.name}`}
                    src={MAP_SRC}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[260px] w-full border-0"
                  />
                </div>
              )}
              {(GOOGLE.mapsUri || GOOGLE.phoneIntl) && (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {GOOGLE.mapsUri && (
                    <a
                      href={GOOGLE.mapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 py-3 font-body text-[14px] font-semibold text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep"
                    >
                      <Navigation className="h-[18px] w-[18px]" /> Cómo llegar
                    </a>
                  )}
                  {GOOGLE.phoneIntl && (
                    <a
                      href={`tel:${GOOGLE.phoneIntl}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 py-3 font-body text-[14px] font-semibold text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep"
                    >
                      <Phone className="h-[18px] w-[18px]" /> Llamar {GOOGLE.phoneDisplay}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </Reveal>

        {/* Form */}
        <Reveal className="rounded-3xl border border-line bg-paper p-7 shadow-card sm:p-9">
          <h3 className="font-display text-[24px] font-semibold text-ink">
            {CONTACT.formTitle}
          </h3>
          <p className="mt-1 font-body text-[14px] text-muted">
            {CONTACT.formSubtitle}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="c-name" className={labelCls}>
                {CONTACT.labels.name}
              </label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={CONTACT.placeholders.name}
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor="c-service" className={labelCls}>
                {CONTACT.labels.service}
              </label>
              <Select
                id="c-service"
                value={service}
                onChange={setService}
                options={SERVICE_OPTS}
              />
            </div>
            <div>
              <label htmlFor="c-note" className={labelCls}>
                {CONTACT.labels.note}{" "}
                <span className="font-normal text-faint">(opcional)</span>
              </label>
              <textarea
                id="c-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={CONTACT.placeholders.note}
                rows={3}
                className={`${fieldCls} min-h-[88px] resize-y`}
              />
            </div>

            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-gold px-6 py-4 font-body text-[15px] font-semibold text-white no-underline shadow-gold transition-colors hover:bg-gold-deep"
            >
              <MessageCircle className="h-[18px] w-[18px]" /> {CONTACT.cta}
            </a>
            <p className="flex items-center justify-center gap-1.5 font-body text-[12.5px] text-faint">
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-gold-deep" /> Mensaje copiado:
                  pégalo en el chat
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copiamos tu mensaje al abrir
                  WhatsApp
                </>
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
