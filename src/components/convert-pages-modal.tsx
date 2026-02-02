"use client";

import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ConvertPagesModalProps = {
  open: boolean;
  title: string;
  filename: string;
  totalPages: number;
  canConvertAll: boolean;
  /** When true, user is on Pro plan: show Pro features (Convert All, no upgrade prompt) */
  isProUser?: boolean;
  maxSelectPages: number;
  freeMaxPages: number;
  labels: {
    fileHasPages: (total: number) => string;
    convertAll: string;
    convertSelected: string;
    selectPagesHint: string;
    maxPagesHint: (max: number) => string;
    upgradeToPro: string;
    onlyProPopover: string;
    from: string;
    to: string;
    addRange: string;
    clear: string;
    selected: string;
    cancel: string;
  };
  onClose: () => void;
  onUpgrade: () => void;
  onConfirm: (pages: string | null) => void;
};

function parsePages(spec: string): number[] {
  const raw = spec.trim();
  if (!raw) return [];
  const pages = new Set<number>();
  for (const partRaw of raw.split(",")) {
    const part = partRaw.trim();
    if (!part) continue;
    if (part.includes("-")) {
      const [aRaw, bRaw] = part.split("-", 2).map((s) => s.trim());
      const a = Number(aRaw);
      const b = Number(bRaw);
      if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("invalid");
      const start = Math.min(a, b);
      const end = Math.max(a, b);
      if (!Number.isInteger(start) || !Number.isInteger(end) || start <= 0)
        throw new Error("invalid");
      for (let i = start; i <= end; i++) pages.add(i);
    } else {
      const n = Number(part);
      if (!Number.isInteger(n) || n <= 0) throw new Error("invalid");
      pages.add(n);
    }
  }
  return Array.from(pages).sort((x, y) => x - y);
}

function pagesToSpec(pages: number[]): string {
  if (pages.length === 0) return "";
  const ranges: Array<[number, number]> = [];
  let start = pages[0];
  let prev = pages[0];
  for (let i = 1; i < pages.length; i++) {
    const cur = pages[i];
    if (cur === prev + 1) {
      prev = cur;
      continue;
    }
    ranges.push([start, prev]);
    start = cur;
    prev = cur;
  }
  ranges.push([start, prev]);
  return ranges.map(([a, b]) => (a === b ? String(a) : `${a}-${b}`)).join(",");
}

export function ConvertPagesModal(props: ConvertPagesModalProps) {
  const {
    open,
    title,
    filename,
    totalPages,
    canConvertAll,
    isProUser = false,
    maxSelectPages,
    freeMaxPages,
    labels,
    onClose,
    onUpgrade,
    onConfirm,
  } = props;

  const hasProFeatures = canConvertAll || isProUser;
  const defaultMode: "all" | "selected" = hasProFeatures ? "all" : "selected";
  const [mode, setMode] = useState<"all" | "selected">(defaultMode);
  const [pagesSpec, setPagesSpec] = useState(() =>
    canConvertAll ? "" : `1-${Math.min(freeMaxPages, totalPages)}`,
  );

  const [rangeFrom, setRangeFrom] = useState<number>(1);
  const [rangeTo, setRangeTo] = useState<number>(Math.min(maxSelectPages, totalPages));
  const [proHintOpen, setProHintOpen] = useState(false);

  const selectedPages = useMemo(() => {
    if (mode !== "selected") return [];
    try {
      return parsePages(pagesSpec);
    } catch {
      return [];
    }
  }, [mode, pagesSpec]);

  const validation = useMemo(() => {
    if (mode === "all") return { ok: true, message: "" };
    try {
      const pages = selectedPages;
      if (pages.length === 0) return { ok: false, message: "Select at least one page." };
      if (pages.some((p) => p < 1 || p > totalPages))
        return { ok: false, message: "Pages out of range." };
      if (pages.length > maxSelectPages)
        return { ok: false, message: `Too many pages (max ${maxSelectPages}).` };
      return { ok: true, message: "" };
    } catch {
      return { ok: false, message: "Invalid page selection." };
    }
  }, [mode, selectedPages, totalPages, maxSelectPages]);

  const canShowGrid = totalPages <= 48;

  return (
    <Dialog
      open={open}
      onOpenChange={(next: boolean) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="border-ink bg-paper max-h-[90vh] w-[95vw] max-w-[1100px] overflow-hidden border-[3px] p-0 shadow-lg focus:outline-none">
        <div className="border-ink bg-paper text-ink flex max-h-[90vh] flex-col overflow-y-auto [background-image:radial-gradient(var(--ink)_12%,transparent_12%)] [background-size:6px_6px]">
          <div className="border-ink bg-paper flex min-h-0 flex-1 flex-col border-x-0 border-t-0 border-b-0 p-5 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DialogTitle className="font-dela text-2xl uppercase md:text-3xl">
                  {title}
                </DialogTitle>
                <div
                  className="mt-2 truncate text-xs font-bold uppercase opacity-70 md:text-sm"
                  title={filename}
                >
                  {filename}
                </div>
                <div className="mt-4 text-base font-bold md:text-lg">
                  {labels.fileHasPages(totalPages)}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="border-ink hover:bg-ink hover:text-paper shrink-0 border-[2px] px-4 py-2 text-sm font-bold uppercase transition-colors"
              >
                {labels.cancel}
              </button>
            </div>

            <div className="border-ink mt-6 grid gap-4 border-t-[3px] pt-6">
              <div className="flex flex-wrap items-center gap-3">
                {hasProFeatures ? (
                  <button
                    type="button"
                    onClick={() => setMode("all")}
                    className={`border-ink border-[2px] px-4 py-3 text-sm font-bold uppercase transition-colors ${
                      mode === "all" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-ink/10"
                    }`}
                  >
                    {labels.convertAll}
                  </button>
                ) : (
                  <Popover open={proHintOpen} onOpenChange={setProHintOpen}>
                    <PopoverTrigger asChild>
                      <span
                        className="inline-flex"
                        onMouseEnter={() => setProHintOpen(true)}
                        onMouseLeave={() => setProHintOpen(false)}
                      >
                        <button
                          type="button"
                          aria-disabled
                          onClick={() => {}}
                          className="border-ink cursor-not-allowed border-[2px] px-4 py-3 text-sm font-bold uppercase opacity-50"
                        >
                          {labels.convertAll}
                        </button>
                      </span>
                    </PopoverTrigger>
                    <PopoverContent sideOffset={10} className="w-72">
                      {labels.onlyProPopover}
                    </PopoverContent>
                  </Popover>
                )}

                <button
                  type="button"
                  onClick={() => setMode("selected")}
                  className={`border-ink border-[2px] px-4 py-3 text-sm font-bold uppercase transition-colors ${
                    mode === "selected" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-ink/10"
                  }`}
                >
                  {labels.convertSelected}
                </button>

                {!hasProFeatures && (
                  <button
                    type="button"
                    onClick={onUpgrade}
                    className="border-ink bg-ink text-paper hover:bg-paper hover:text-ink ml-auto border-[2px] px-4 py-3 text-sm font-bold uppercase transition-colors"
                  >
                    {labels.upgradeToPro}
                  </button>
                )}
              </div>

              {mode === "selected" && (
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-bold uppercase opacity-70">
                      {labels.maxPagesHint(maxSelectPages)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="border-ink hover:bg-ink/10 border-[2px] px-3 py-2 text-xs font-bold uppercase"
                        onClick={() =>
                          setPagesSpec(`1-${Math.min(maxSelectPages, Math.max(1, totalPages))}`)
                        }
                      >
                        First {Math.min(maxSelectPages, totalPages)}
                      </button>
                      <button
                        type="button"
                        className="border-ink hover:bg-ink/10 border-[2px] px-3 py-2 text-xs font-bold uppercase"
                        onClick={() => setPagesSpec("")}
                      >
                        {labels.clear}
                      </button>
                    </div>
                  </div>

                  <div className="border-ink bg-paper grid gap-3 border-[2px] p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
                      <label className="grid gap-1">
                        <span className="text-xs font-bold uppercase opacity-70">
                          {labels.from}
                        </span>
                        <input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={rangeFrom}
                          onChange={(e) => setRangeFrom(Number(e.target.value))}
                          className="border-ink bg-paper border-2 px-3 py-2 font-mono text-sm"
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="text-xs font-bold uppercase opacity-70">{labels.to}</span>
                        <input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={rangeTo}
                          onChange={(e) => setRangeTo(Number(e.target.value))}
                          className="border-ink bg-paper border-2 px-3 py-2 font-mono text-sm"
                        />
                      </label>
                      <button
                        type="button"
                        className="border-ink bg-ink text-paper hover:bg-paper hover:text-ink h-[42px] self-end border-[2px] px-4 text-sm font-bold uppercase transition-colors"
                        onClick={() => {
                          const a = Math.max(1, Math.min(totalPages, Math.floor(rangeFrom || 1)));
                          const b = Math.max(1, Math.min(totalPages, Math.floor(rangeTo || a)));
                          const start = Math.min(a, b);
                          const end = Math.max(a, b);
                          const next = new Set(selectedPages);
                          for (let p = start; p <= end; p++) next.add(p);
                          const nextArr = Array.from(next).sort((x, y) => x - y);
                          if (nextArr.length > maxSelectPages) return;
                          setPagesSpec(pagesToSpec(nextArr));
                        }}
                        disabled={selectedPages.length >= maxSelectPages}
                      >
                        {labels.addRange}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-bold uppercase opacity-70">
                        {labels.selected}: {selectedPages.length}/{maxSelectPages}
                      </div>
                      <div className="truncate font-mono text-xs" title={pagesSpec}>
                        {pagesSpec || labels.selectPagesHint}
                      </div>
                    </div>

                    {canShowGrid && (
                      <div className="border-ink grid grid-cols-8 gap-1 border-t-[1.5px] pt-3 sm:grid-cols-10 md:grid-cols-12">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                          const active = selectedPages.includes(p);
                          const disabled = !active && selectedPages.length >= maxSelectPages;
                          return (
                            <button
                              key={p}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                const next = new Set(selectedPages);
                                if (active) next.delete(p);
                                else next.add(p);
                                const arr = Array.from(next).sort((x, y) => x - y);
                                if (arr.length > maxSelectPages) return;
                                setPagesSpec(pagesToSpec(arr));
                              }}
                              className={`border-ink border-[1.5px] py-1 text-[0.7rem] font-bold transition-colors ${
                                active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-ink/10"
                              } disabled:opacity-40`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {!validation.ok && (
                      <div className="border-ink bg-ink/5 border-[1.5px] px-3 py-2 text-xs font-bold">
                        {validation.message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onConfirm(mode === "all" ? null : pagesSpec)}
                  disabled={mode === "selected" && !validation.ok}
                  className="border-ink bg-ink text-paper hover:bg-paper hover:text-ink border-[3px] px-6 py-3 text-base font-bold uppercase transition-colors disabled:opacity-50"
                >
                  {mode === "all" ? labels.convertAll : labels.convertSelected}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
