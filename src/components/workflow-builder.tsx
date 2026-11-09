"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { blocks, kindMeta, presets, type Block, type BlockKind } from "@/content/workflow";

type Item = { uid: number; id: string };

const byId = new Map(blocks.map((b) => [b.id, b]));
let uidSeq = 1;
const toItems = (ids: string[]): Item[] => ids.map((id) => ({ uid: uidSeq++, id }));

export const SCENARIO_KEY = "fsp-scenario";

export function WorkflowBuilder() {
  const [presetId, setPresetId] = useState(presets[0].id);
  const [items, setItems] = useState<Item[]>(() => toItems(presets[0].chain));
  const [runs, setRuns] = useState(presets[0].runsPerMonth);
  const [active, setActive] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const drag = useRef<{ from: "canvas"; index: number } | { from: "palette"; id: string } | null>(null);

  const preset = presets.find((p) => p.id === presetId);

  // ?scenariusz=<id> wczytuje wybrany scenariusz (linki z podstron branż).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("scenariusz");
    if (id && presets.some((p) => p.id === id)) loadPreset(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPreset = (id: string) => {
    const p = presets.find((x) => x.id === id)!;
    setPresetId(id);
    setItems(toItems(p.chain));
    setRuns(p.runsPerMonth);
    reset();
  };

  const reset = () => {
    setActive(-1);
    setLog([]);
  };

  const custom = () => {
    setPresetId("");
    reset();
  };

  const insert = (id: string, at = items.length) => {
    setItems((s) => [...s.slice(0, at), { uid: uidSeq++, id }, ...s.slice(at)]);
    custom();
  };
  const remove = (i: number) => {
    setItems((s) => s.filter((_, k) => k !== i));
    custom();
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    setItems((s) => {
      const next = [...s];
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      return next;
    });
    custom();
  };

  // --- Drag & drop -------------------------------------------------------
  const onDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDropAt(e.clientY < rect.top + rect.height / 2 ? index : index + 1);
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const d = drag.current;
    const at = dropAt ?? items.length;
    if (d?.from === "palette") insert(d.id, at);
    if (d?.from === "canvas") move(d.index, at > d.index ? at - 1 : at);
    drag.current = null;
    setDropAt(null);
  };

  // --- Walidacja i wyliczenia -------------------------------------------
  const chain = items.map((i) => byId.get(i.id)!);
  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!chain.length) return ["Dodaj bloki, żeby zbudować automatyzację."];
    if (chain[0].kind !== "trigger") w.push("Automatyzacja powinna zaczynać się od wyzwalacza (niebieski blok).");
    if (chain.filter((b) => b.kind === "trigger").length > 1) w.push("Masz więcej niż jeden wyzwalacz. W praktyce to osobne automatyzacje.");
    if (!chain.some((b) => b.kind === "action")) w.push("Dodaj co najmniej jedną akcję (zielony blok).");
    return w;
  }, [chain]);

  const minutesPerRun = chain.reduce((s, b) => s + b.minutes, 0);
  const hoursPerMonth = (minutesPerRun * runs) / 60;

  const simulate = async () => {
    if (running || !chain.length) return;
    setRunning(true);
    setLog([]);
    for (let i = 0; i < chain.length; i++) {
      setActive(i);
      setLog((l) => [...l, chain[i].log]);
      await new Promise((r) => setTimeout(r, 600));
    }
    setActive(chain.length);
    setRunning(false);
  };

  const askAbout = () => {
    const text =
      `Interesuje mnie automatyzacja${preset ? ` „${preset.name}”` : ""}:\n` +
      chain.map((b, i) => `${i + 1}. ${b.label}`).join("\n") +
      `\n\nSzacunkowo ${runs} uruchomień miesięcznie.`;
    try {
      sessionStorage.setItem(SCENARIO_KEY, text);
    } catch {}
    window.location.href = "/#kontakt";
  };

  const groups: BlockKind[] = ["trigger", "ai", "action"];

  return (
    <div className="space-y-6">
      {/* Scenariusze */}
      <div>
        <p className="mb-3 text-sm font-medium">Wybierz gotowy scenariusz albo zbuduj własny:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => loadPreset(p.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                presetId === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        {preset && <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{preset.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px]">
        {/* Paleta */}
        <aside className="min-w-0 rounded-xl border border-border bg-card p-4 lg:max-h-[640px] lg:overflow-y-auto">
          <p className="text-sm font-semibold">Bloki</p>
          <p className="mb-3 text-xs text-muted-foreground">Przeciągnij na schemat albo kliknij +</p>
          {groups.map((g) => (
            <div key={g} className="mb-4">
              <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${kindMeta[g].dot}`} /> {kindMeta[g].label}
              </p>
              <ul className="space-y-1.5">
                {blocks.filter((b) => b.kind === g).map((b) => (
                  <li
                    key={b.id}
                    draggable
                    onDragStart={() => (drag.current = { from: "palette", id: b.id })}
                    onDragEnd={() => setDropAt(null)}
                    className="flex cursor-grab items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm active:cursor-grabbing"
                  >
                    <span className="truncate" title={b.desc}>{b.label}</span>
                    <button type="button" onClick={() => insert(b.id)} aria-label={`Dodaj blok ${b.label}`}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded border border-border text-muted-foreground hover:bg-muted hover:text-foreground">+</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Schemat */}
        <section
          aria-label="Schemat automatyzacji"
          onDragOver={(e) => {
            e.preventDefault();
            if (!items.length) setDropAt(0);
          }}
          onDrop={onDrop}
          className="min-h-[320px] min-w-0 rounded-xl border border-dashed border-border p-4"
        >
          {!items.length && (
            <div className="grid h-full min-h-[280px] place-items-center text-center text-sm text-muted-foreground">
              Przeciągnij tu bloki z lewej strony.
            </div>
          )}
          <ol>
            {chain.map((b, i) => (
              <li key={items[i].uid}>
                {dropAt === i && <DropLine />}
                <BlockCard
                  block={b}
                  index={i}
                  total={chain.length}
                  state={active === i ? "running" : active > i ? "done" : "idle"}
                  onDragStart={() => (drag.current = { from: "canvas", index: i })}
                  onDragOver={(e) => onDragOver(e, i)}
                  onDragEnd={() => setDropAt(null)}
                  onUp={() => move(i, i - 1)}
                  onDown={() => move(i, i + 1)}
                  onRemove={() => remove(i)}
                />
                {i < chain.length - 1 && <div className="mx-auto h-5 w-px bg-border" aria-hidden />}
              </li>
            ))}
            {dropAt === items.length && items.length > 0 && <DropLine />}
          </ol>
        </section>

        {/* Wynik */}
        <aside className="min-w-0 space-y-4 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:col-span-1 xl:block xl:space-y-4">
          <div className="rounded-xl bg-primary p-5 text-primary-foreground">
            <p className="text-sm opacity-70">Szacowany odzyskany czas</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">~{Math.round(hoursPerMonth)} h / mies.</p>
            <p className="mt-1 text-xs opacity-70">{minutesPerRun} min ręcznej pracy na jedno uruchomienie</p>
            <label className="mt-4 block text-xs opacity-80" htmlFor="runs">Uruchomień miesięcznie: {runs}</label>
            <input id="runs" type="range" min={1} max={500} value={runs} onChange={(e) => setRuns(Number(e.target.value))}
              className="mt-1 w-full accent-[var(--primary-foreground)]" />
          </div>

          {warnings.length > 0 && (
            <ul className="space-y-1 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs">
              {warnings.map((w) => <li key={w}>{w}</li>)}
            </ul>
          )}

          <button type="button" onClick={simulate} disabled={running || !chain.length}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border text-sm font-medium hover:bg-muted disabled:opacity-50">
            {running ? "Symulacja trwa…" : "▶ Uruchom symulację"}
          </button>

          <div className="min-h-[120px] rounded-xl border border-border bg-card p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Log</p>
            {log.length ? (
              <ol className="space-y-1.5 font-mono text-xs" aria-live="polite">
                {log.map((l, i) => <li key={i}><span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span> {l}</li>)}
              </ol>
            ) : (
              <p className="text-xs text-muted-foreground">Uruchom symulację, żeby zobaczyć, co dzieje się na każdym kroku.</p>
            )}
            {active === chain.length && chain.length > 0 && (
              <p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">✓ Gotowe, bez ręcznej pracy.</p>
            )}
          </div>

          <button type="button" onClick={askAbout} disabled={!chain.length}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">
            Zapytaj o ten scenariusz
          </button>
        </aside>
      </div>
    </div>
  );
}

function DropLine() {
  return <div className="my-1 h-1 rounded-full bg-sky-500" aria-hidden />;
}

function BlockCard(props: {
  block: Block;
  index: number;
  total: number;
  state: "idle" | "running" | "done";
  onDragStart: () => void;
  onDragOver: (e: DragEvent) => void;
  onDragEnd: () => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  const { block: b, index, total, state } = props;
  const ring =
    state === "running" ? "border-sky-500 ring-2 ring-sky-500/30" : state === "done" ? "border-emerald-500/60" : "border-border";
  const btn = "grid h-7 w-7 place-items-center rounded border border-border text-xs text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30";
  return (
    <div
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDragEnd={props.onDragEnd}
      className={`flex cursor-grab items-center gap-3 rounded-lg border bg-background p-3 transition-colors active:cursor-grabbing ${ring}`}
    >
      <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${kindMeta[b.kind].dot}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{b.label}</p>
        <p className="truncate text-xs text-muted-foreground">{kindMeta[b.kind].label} · {b.desc}</p>
      </div>
      {state === "done" && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓</span>}
      <div className="flex shrink-0 gap-1">
        <button type="button" onClick={props.onUp} disabled={index === 0} aria-label="Przesuń w górę" className={btn}>↑</button>
        <button type="button" onClick={props.onDown} disabled={index === total - 1} aria-label="Przesuń w dół" className={btn}>↓</button>
        <button type="button" onClick={props.onRemove} aria-label="Usuń blok" className={btn}>✕</button>
      </div>
    </div>
  );
}
