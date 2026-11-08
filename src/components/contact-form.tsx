"use client";

import { useState, type FormEvent } from "react";
import { buttonClass } from "./ui";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "/api/contact";

type Status = "idle" | "sending" | "ok" | "error";

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Nie udało się wysłać wiadomości.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Nie udało się wysłać wiadomości.");
    }
  }

  if (status === "ok") {
    return (
      <div className="grid place-items-center rounded-xl border border-border bg-card p-10 text-center">
        <div>
          <p className="text-lg font-semibold">Dziękuję za wiadomość!</p>
          <p className="mt-2 text-sm text-muted-foreground">Odezwę się najszybciej, jak to możliwe.</p>
          <button type="button" onClick={() => setStatus("idle")} className={`${buttonClass.outline} mt-6`}>
            Wyślij kolejną
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Imię i nazwisko" htmlFor="name">
          <input id="name" name="name" required maxLength={100} className={input} autoComplete="name" />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <input id="email" name="email" type="email" required maxLength={200} className={input} autoComplete="email" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Firma (opcjonalnie)" htmlFor="company">
          <input id="company" name="company" maxLength={100} className={input} autoComplete="organization" />
        </Field>
        <Field label="Czego dotyczy?" htmlFor="topic">
          <select id="topic" name="topic" className={input} defaultValue="Automatyzacja procesów">
            <option>Automatyzacja procesów</option>
            <option>Wdrożenie AI</option>
            <option>Nie wiem jeszcze, chcę porozmawiać</option>
          </select>
        </Field>
      </div>
      <Field label="Wiadomość" htmlFor="message">
        <textarea id="message" name="message" required rows={5} maxLength={5000} className={input}
          placeholder="Czym zajmuje się Twoja firma i co zabiera Wam najwięcej czasu?" />
      </Field>
      {/* Honeypot przeciw botom: ukryte pole, ludzie go nie wypełnią. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" name="consent" value="tak" required className="mt-0.5" />
        Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie (RODO).
      </label>
      {status === "error" && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"} className={`${buttonClass.primary} w-full`}>
        {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
