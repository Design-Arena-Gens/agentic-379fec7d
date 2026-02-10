"use client";

import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FunnelIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import type { SegmentFilters } from "@/lib/targeting";

const regionOptions = ["NA", "EU", "APAC", "LATAM", "MEA"] as const;
const playstyleOptions = ["Aggressor", "Strategist", "Support", "Wildcard", "Rookie", "Veteran"] as const;
const monetizationOptions = ["None", "Cosmetics", "BattlePass", "Premium"] as const;
const deviceOptions = ["High", "Mid", "Low"] as const;
const frequencyOptions = ["Daily", "Weekly", "Weekend"] as const;
const modeOptions = ["Ranked", "Arcade", "Co-op", "Events"] as const;

type ArrayFilterKey =
  | "regions"
  | "playstyles"
  | "monetization"
  | "deviceTier"
  | "sessionFrequency"
  | "preferredMode";

type ArrayValue = SegmentFilters[ArrayFilterKey] extends (infer U)[] | undefined ? U : never;

interface FilterPanelProps {
  filters: SegmentFilters;
  onChange: (filters: SegmentFilters) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const toggleArrayValue = (key: ArrayFilterKey, value: ArrayValue) => {
    const current = (filters[key] as string[] | undefined) ?? [];
    const list = new Set(current);
    if (list.has(value as string)) {
      list.delete(value as string);
    } else {
      list.add(value as string);
    }
    const normalized = Array.from(list) as string[];
    if (normalized.length === 0) {
      const { [key]: _removed, ...rest } = filters;
      onChange(rest as SegmentFilters);
    } else {
      onChange({ ...filters, [key]: normalized } as SegmentFilters);
    }
  };

  const updateMmr = (min: number, max: number) => {
    const mmrRange: [number, number] = [Math.min(min, max), Math.max(min, max)];
    if (min <= 800 && max >= 2100) {
      const { mmrRange: _removed, ...rest } = filters;
      onChange(rest as SegmentFilters);
      return;
    }
    onChange({ ...filters, mmrRange });
  };

  const updateLatency = (value: number) => {
    if (value >= 150) {
      const { latencyMax: _removed, ...rest } = filters;
      onChange(rest as SegmentFilters);
      return;
    }
    onChange({ ...filters, latencyMax: value });
  };

  const mmrMin = filters.mmrRange?.[0] ?? 800;
  const mmrMax = filters.mmrRange?.[1] ?? 2100;
  const latencyMax = filters.latencyMax ?? 150;

  return (
    <section className="gradient-card p-6 lg:p-7">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3rem] text-primary-300/80">Targeting Stack</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Segment Filters</h2>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-300">
          <FunnelIcon className="h-6 w-6" />
        </span>
      </header>

      <dl className="mt-6 space-y-5">
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="rounded-xl border border-white/10 bg-white/5">
              <Disclosure.Button className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-white focus:outline-none">
                <span>Core Cohorts</span>
                <ChevronUpDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
              </Disclosure.Button>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-y-75 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-75 opacity-0"
              >
                <Disclosure.Panel className="grid gap-6 px-5 pb-5 text-sm text-slate-200 lg:grid-cols-2">
                  <FilterGroup
                    title="Regions"
                    options={regionOptions}
                    active={new Set(filters.regions ?? [])}
                    onToggle={(value) => toggleArrayValue("regions", value)}
                  />
                  <FilterGroup
                    title="Playstyles"
                    options={playstyleOptions}
                    active={new Set(filters.playstyles ?? [])}
                    onToggle={(value) => toggleArrayValue("playstyles", value)}
                  />
                  <FilterGroup
                    title="Monetization"
                    options={monetizationOptions}
                    active={new Set(filters.monetization ?? [])}
                    onToggle={(value) => toggleArrayValue("monetization", value)}
                  />
                  <FilterGroup
                    title="Device Tier"
                    options={deviceOptions}
                    active={new Set(filters.deviceTier ?? [])}
                    onToggle={(value) => toggleArrayValue("deviceTier", value)}
                  />
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>

        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="rounded-xl border border-white/10 bg-white/5">
              <Disclosure.Button className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-white focus:outline-none">
                <span>Engagement Signals</span>
                <ChevronUpDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
              </Disclosure.Button>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-y-75 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-75 opacity-0"
              >
                <Disclosure.Panel className="grid gap-6 px-5 pb-5 text-sm text-slate-200 lg:grid-cols-2">
                  <FilterGroup
                    title="Session Cadence"
                    options={frequencyOptions}
                    active={new Set(filters.sessionFrequency ?? [])}
                    onToggle={(value) => toggleArrayValue("sessionFrequency", value)}
                  />
                  <FilterGroup
                    title="Preferred Modes"
                    options={modeOptions}
                    active={new Set(filters.preferredMode ?? [])}
                    onToggle={(value) => toggleArrayValue("preferredMode", value)}
                  />
                  <div className="lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">MMR Envelope</p>
                    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex gap-4 text-xs text-slate-300">
                        <div className="flex flex-1 flex-col">
                          <label className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">Min</label>
                          <input
                            className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white"
                            type="number"
                            min={600}
                            max={2200}
                            step={50}
                            value={mmrMin}
                            onChange={(event) => updateMmr(Number(event.target.value), mmrMax)}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <label className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">Max</label>
                          <input
                            className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white"
                            type="number"
                            min={800}
                            max={2400}
                            step={50}
                            value={mmrMax}
                            onChange={(event) => updateMmr(mmrMin, Number(event.target.value))}
                          />
                        </div>
                      </div>
                      <div className="grid gap-3 text-xs text-slate-400 md:grid-cols-2">
                        <label className="flex flex-col gap-2">
                          <span>Latency Ceiling ({latencyMax} ms)</span>
                          <input
                            type="range"
                            min={60}
                            max={180}
                            step={5}
                            value={latencyMax}
                            onChange={(event) => updateLatency(Number(event.target.value))}
                            className="accent-primary-500"
                          />
                        </label>
                        <p className="rounded-lg border border-dashed border-primary-500/40 bg-primary-500/10 p-3 text-[11px] text-primary-200">
                          Tune MMR and latency thresholds to project lobby stability for upcoming seasons and live ops beats.
                        </p>
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </dl>
    </section>
  );
}

interface FilterGroupProps<T extends readonly string[]> {
  title: string;
  options: T;
  active: Set<T[number]>;
  onToggle: (value: T[number]) => void;
}

function FilterGroup<T extends readonly string[]>({ title, options, active, onToggle }: FilterGroupProps<T>) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              active.has(option)
                ? "border-primary-500 bg-primary-500/20 text-primary-200"
                : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-primary-400/60 hover:text-primary-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
