"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Check, Clock, Loader2, MessageCircle, RotateCcw } from "lucide-react";

import { AGENDA, SERVICES, SITE } from "@/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Select from "./Select";

const SERVICE_OPTS = ["Aún no lo sé, necesito orientación", ...SERVICES.items.map((s) => s.name)];

/** El número sale del link de WhatsApp de SITE para no repetirlo a mano. */
const WHATSAPP_NUMBER = SITE.whatsapp.match(/wa\.me\/(\d+)/)?.[1] ?? "";

type FieldKey = "name" | "phone" | "email" | "date" | "time" | "species" | "pet";

const fieldCls =
  "min-h-[44px] w-full rounded-xl border border-line bg-paper px-4 py-3 font-body text-[15px] text-ink outline-none transition-colors placeholder:text-faint hover:border-gold-soft focus:border-gold focus:ring-2 focus:ring-gold/20";
const labelCls = "mb-1.5 block font-body text-[13px] font-semibold text-ink-soft";
const errCls = "mt-1.5 font-body text-[12.5px] font-medium text-brand-deep";

/** Fecha de hoy en formato YYYY-MM-DD, en la zona del visitante. */
function todayISO(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function maxISO(): string {
  const d = new Date(Date.now() + 60 * 86_400_000);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export default function Agenda() {
  const [service, setService] = useState(SERVICE_OPTS[0]);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    pet: "",
    breed: "",
    age: "",
    weight: "",
    date: "",
    note: "",
  });
  // Los desplegables van aparte porque arrancan con un valor por defecto.
  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState(AGENDA.petOptions.sex[0]);
  const [status, setStatus] = useState(AGENDA.petOptions.status[0]);
  const [vaccines, setVaccines] = useState(AGENDA.petOptions.vaccines[0]);
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const [slots, setSlots] = useState<string[] | null>(null);
  const [closed, setClosed] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState<null | { confirmed: boolean; when: string }>(null);

  // Al cambiar el día, se piden los horarios libres al servidor.
  useEffect(() => {
    if (!values.date) {
      setSlots(null);
      setClosed(false);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    setTime("");
    fetch(`/api/availability?date=${values.date}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setSlots(Array.isArray(data.slots) ? data.slots : []);
        setClosed(Boolean(data.closed));
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [values.date]);

  const set = (key: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const waHref = (() => {
    const msg =
      `Hola ${SITE.name} 👋 Quiero agendar una cita.\n\n` +
      `• Dueño: ${values.name}\n` +
      (values.pet ? `• Mascota: ${values.pet}${species ? ` (${species})` : ""}\n` : "") +
      (values.breed ? `• Raza: ${values.breed}\n` : "") +
      (values.age ? `• Edad: ${values.age}\n` : "") +
      (values.weight ? `• Peso: ${values.weight}\n` : "") +
      `• Servicio: ${service}\n` +
      `• Día: ${prettyDate(values.date)}\n` +
      `• Hora: ${time}\n` +
      `• Teléfono: ${values.phone}` +
      (values.note.trim() ? `\n• Nota: ${values.note.trim()}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!values.name.trim()) e.name = AGENDA.errors.required;
    if (!values.pet.trim()) e.pet = AGENDA.errors.required;
    if (!species) e.species = AGENDA.errors.species;
    if (values.phone.replace(/\D/g, "").length < 7) e.phone = AGENDA.errors.phone;
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = AGENDA.errors.email;
    if (!values.date) e.date = AGENDA.errors.date;
    if (!time) e.time = AGENDA.errors.time;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting || !validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, service, time, species, sex, status, vaccines }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        // Alguien tomó el horario mientras se llenaba el formulario.
        setSubmitError(data.error || AGENDA.errors.generic);
        setTime("");
        const r = await fetch(`/api/availability?date=${values.date}`).then((x) => x.json());
        setSlots(Array.isArray(r.slots) ? r.slots : []);
        return;
      }
      if (!res.ok) {
        setSubmitError(data.error || AGENDA.errors.generic);
        return;
      }
      setDone({ confirmed: Boolean(data.confirmed), when: data.when ?? "" });
    } catch {
      setSubmitError(AGENDA.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setService(SERVICE_OPTS[0]);
    setValues({ name: "", phone: "", email: "", pet: "", breed: "", age: "", weight: "", date: "", note: "" });
    setSpecies("");
    setSex(AGENDA.petOptions.sex[0]);
    setStatus(AGENDA.petOptions.status[0]);
    setVaccines(AGENDA.petOptions.vaccines[0]);
    setTime("");
    setErrors({});
    setSlots(null);
    setSubmitError("");
    setDone(null);
  };

  return (
    <section id="agenda" className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[760px]">
        <SectionHeading eyebrow={AGENDA.eyebrow} title={AGENDA.title} subtitle={AGENDA.subtitle} />

        <Reveal className="mt-10 rounded-3xl border border-line bg-paper p-7 shadow-card sm:p-9">
          {done ? (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-tint text-gold-deep">
                <Check className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h3 className="mt-5 font-display text-[26px] font-semibold text-ink">
                {done.confirmed ? AGENDA.success.confirmedTitle : AGENDA.success.pendingTitle}
              </h3>
              {done.when && (
                <p className="mt-2 font-body text-[15px] font-semibold capitalize text-gold-deep">
                  {done.when}
                </p>
              )}
              <p className="mx-auto mt-3 max-w-[440px] font-body text-[14.5px] leading-[1.65] text-muted">
                {done.confirmed ? AGENDA.success.confirmedText : AGENDA.success.pendingText}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {!done.confirmed && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-gold px-6 py-4 font-body text-[15px] font-semibold text-white no-underline shadow-gold transition-colors hover:bg-gold-deep"
                  >
                    <MessageCircle className="h-[18px] w-[18px]" /> {AGENDA.success.whatsapp}
                  </a>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-4 font-body text-[15px] font-semibold text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  <RotateCcw className="h-[18px] w-[18px]" /> {AGENDA.success.again}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="h-5 w-5 flex-shrink-0 text-gold-deep" strokeWidth={1.8} />
                <h3 className="font-display text-[24px] font-semibold text-ink">{AGENDA.formTitle}</h3>
              </div>
              <p className="mt-1 font-body text-[14px] text-muted">{AGENDA.formSubtitle}</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="a-service" className={labelCls}>
                    {AGENDA.labels.service}
                  </label>
                  <Select id="a-service" value={service} onChange={setService} options={SERVICE_OPTS} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-name" className={labelCls}>
                      {AGENDA.labels.name}
                    </label>
                    <input
                      id="a-name"
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder={AGENDA.placeholders.name}
                      aria-invalid={!!errors.name}
                      className={fieldCls}
                    />
                    {errors.name && <p className={errCls}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="a-pet" className={labelCls}>
                      {AGENDA.labels.pet}
                    </label>
                    <input
                      id="a-pet"
                      value={values.pet}
                      onChange={(e) => set("pet", e.target.value)}
                      placeholder={AGENDA.placeholders.pet}
                      aria-invalid={!!errors.pet}
                      className={fieldCls}
                    />
                    {errors.pet && <p className={errCls}>{errors.pet}</p>}
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-ivory/60 p-5">
                  <p className="font-body text-[13px] font-semibold uppercase tracking-label text-gold-deep">
                    {AGENDA.petSectionTitle}
                  </p>
                  <p className="mt-1 font-body text-[13px] leading-[1.55] text-muted">
                    {AGENDA.petSectionHint}
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="a-species" className={labelCls}>
                        {AGENDA.labels.species}
                      </label>
                      <Select
                        id="a-species"
                        value={species || "Elige una opción"}
                        onChange={(v) => {
                          setSpecies(v);
                          setErrors((e) => ({ ...e, species: undefined }));
                        }}
                        options={AGENDA.petOptions.species}
                      />
                      {errors.species && <p className={errCls}>{errors.species}</p>}
                    </div>
                    <div>
                      <label htmlFor="a-breed" className={labelCls}>
                        {AGENDA.labels.breed}{" "}
                        <span className="font-normal text-faint">(opcional)</span>
                      </label>
                      <input
                        id="a-breed"
                        value={values.breed}
                        onChange={(e) => set("breed", e.target.value)}
                        placeholder={AGENDA.placeholders.breed}
                        className={fieldCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="a-age" className={labelCls}>
                        {AGENDA.labels.age}{" "}
                        <span className="font-normal text-faint">(opcional)</span>
                      </label>
                      <input
                        id="a-age"
                        value={values.age}
                        onChange={(e) => set("age", e.target.value)}
                        placeholder={AGENDA.placeholders.age}
                        className={fieldCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="a-weight" className={labelCls}>
                        {AGENDA.labels.weight}{" "}
                        <span className="font-normal text-faint">(opcional)</span>
                      </label>
                      <input
                        id="a-weight"
                        value={values.weight}
                        onChange={(e) => set("weight", e.target.value)}
                        placeholder={AGENDA.placeholders.weight}
                        className={fieldCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="a-sex" className={labelCls}>
                        {AGENDA.labels.sex}
                      </label>
                      <Select id="a-sex" value={sex} onChange={setSex} options={AGENDA.petOptions.sex} />
                    </div>
                    <div>
                      <label htmlFor="a-vaccines" className={labelCls}>
                        {AGENDA.labels.vaccines}
                      </label>
                      <Select
                        id="a-vaccines"
                        value={vaccines}
                        onChange={setVaccines}
                        options={AGENDA.petOptions.vaccines}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="a-status" className={labelCls}>
                        {AGENDA.labels.status}
                      </label>
                      <Select
                        id="a-status"
                        value={status}
                        onChange={setStatus}
                        options={AGENDA.petOptions.status}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-phone" className={labelCls}>
                      {AGENDA.labels.phone}
                    </label>
                    <input
                      id="a-phone"
                      type="tel"
                      inputMode="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder={AGENDA.placeholders.phone}
                      aria-invalid={!!errors.phone}
                      className={fieldCls}
                    />
                    {errors.phone && <p className={errCls}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="a-email" className={labelCls}>
                      {AGENDA.labels.email}
                    </label>
                    <input
                      id="a-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder={AGENDA.placeholders.email}
                      aria-invalid={!!errors.email}
                      className={fieldCls}
                    />
                    {errors.email ? (
                      <p className={errCls}>{errors.email}</p>
                    ) : (
                      <p className="mt-1.5 font-body text-[12.5px] text-faint">{AGENDA.hints.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="a-date" className={labelCls}>
                    {AGENDA.labels.date}
                  </label>
                  <input
                    id="a-date"
                    type="date"
                    min={todayISO()}
                    max={maxISO()}
                    value={values.date}
                    onChange={(e) => set("date", e.target.value)}
                    aria-invalid={!!errors.date}
                    className={fieldCls}
                  />
                  {errors.date && <p className={errCls}>{errors.date}</p>}
                </div>

                <fieldset>
                  <legend className={labelCls}>{AGENDA.labels.time}</legend>
                  {!values.date ? (
                    <p className="font-body text-[14px] text-faint">{AGENDA.hints.noDate}</p>
                  ) : loadingSlots ? (
                    <p className="flex items-center gap-2 font-body text-[14px] text-muted">
                      <Loader2 className="h-4 w-4 animate-spin" /> {AGENDA.hints.loading}
                    </p>
                  ) : closed ? (
                    <p className="font-body text-[14px] text-muted">{AGENDA.hints.closed}</p>
                  ) : slots && slots.length === 0 ? (
                    <p className="font-body text-[14px] text-muted">{AGENDA.hints.empty}</p>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {(slots ?? []).map((t) => {
                          const active = time === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                setTime(t);
                                setErrors((e) => ({ ...e, time: undefined }));
                              }}
                              className={`rounded-full border px-4 py-2.5 font-body text-[14px] font-semibold transition-colors ${
                                active
                                  ? "border-gold bg-gold text-white shadow-gold"
                                  : "border-line bg-paper text-ink-soft hover:border-gold-soft hover:text-gold-deep"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 font-body text-[12.5px] text-faint">
                        <Clock className="h-3.5 w-3.5" /> {AGENDA.hints.duration}
                      </p>
                    </>
                  )}
                  {errors.time && <p className={errCls}>{errors.time}</p>}
                </fieldset>

                <div>
                  <label htmlFor="a-note" className={labelCls}>
                    {AGENDA.labels.note} <span className="font-normal text-faint">(opcional)</span>
                  </label>
                  <textarea
                    id="a-note"
                    value={values.note}
                    onChange={(e) => set("note", e.target.value)}
                    rows={3}
                    placeholder={AGENDA.placeholders.note}
                    className={`${fieldCls} min-h-[88px] resize-y`}
                  />
                </div>

                {submitError && (
                  <div className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3">
                    <p className="font-body text-[13.5px] font-medium text-brand-deep">{submitError}</p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-body text-[12.5px] font-semibold text-ink underline underline-offset-2"
                    >
                      {AGENDA.errors.whatsappFallback}
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-6 py-4 font-body text-[15px] font-semibold text-white shadow-gold transition-colors hover:bg-gold-deep disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-[18px] w-[18px] animate-spin" /> {AGENDA.ctaLoading}
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="h-[18px] w-[18px]" /> {AGENDA.cta}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
