"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { SCENARIO_KEY } from "./workflow-builder";
import { buttonClass } from "./ui";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
// Cloudflare Turnstile (opcjonalny): ustaw NEXT_PUBLIC_TURNSTILE_SITE_KEY i TURNSTILE_SECRET_KEY.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "/api/contact";

type Status = "idle" | "sending" | "ok" | "error";

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, [status]);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  // Treść scenariusza z kreatora (/realizacje) wpisuje się do wiadomości.
  useEffect(() => {
    try {
      const text = sessionStorage.getItem(SCENARIO_KEY);
      if (text && messageRef.current && !messageRef.current.value) {
        messageRef.current.value = text;
        sessionStorage.removeItem(SCENARIO_KEY);
      }
    } catch {}
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), _t: Date.now() - startedAt.current };
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
      window.turnstile?.reset();
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
    <form onSubmit={onSubmit} className="relative space-y-4 rounded-xl border border-border bg-card p-6">
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
          <div className="relative">
            <select id="topic" name="topic" className={`${input} cursor-pointer appearance-none pr-10`} defaultValue="Bezpłatna konsultacja">
              <option>Bezpłatna konsultacja</option>
              <option>Wdrożenie AI</option>
              <option>Automatyzacja procesów</option>
              <option>Wsparcie i utrzymanie</option>
              <option>Inne</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </Field>
      </div>
      <Field label="Wiadomość" htmlFor="message">
        <textarea ref={messageRef} id="message" name="message" required rows={5} maxLength={5000} className={input}
          placeholder="Czym zajmuje się Twoja firma i co zabiera Wam najwięcej czasu?" />
      </Field>
      {/* Honeypot przeciw botom: ukryte pole, ludzie go nie wypełnią. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Strona WWW</label>
        <input id="website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-language="pl" data-theme="auto" />
        </>
      )}
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" name="consent" value="tak" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]" />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie. Szczegóły w{" "}
          <a href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-foreground">polityce prywatności</a>.
        </span>
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
