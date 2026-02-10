"use client";

import { useMemo, useState } from "react";
import { players as basePlayers } from "@/data/players";
import {
  computeSegmentScore,
  filterPlayers,
  getPersonaDistribution,
  getSegmentDiagnostics,
  getSegmentInsights,
  inferLaunchMoments,
  type SegmentFilters
} from "@/lib/targeting";
import { FilterPanel } from "@/components/FilterPanel";
import { SegmentSummary } from "@/components/SegmentSummary";
import { PersonaRadar } from "@/components/PersonaRadar";
import { PlayersTable } from "@/components/PlayersTable";
import { LaunchMoments } from "@/components/LaunchMoments";

const defaultFilters: SegmentFilters = {
  regions: ["NA", "EU", "APAC"],
  sessionFrequency: ["Daily", "Weekly"],
  mmrRange: [1100, 2000],
  latencyMax: 120
};

export default function HomePage() {
  const [filters, setFilters] = useState<SegmentFilters>(defaultFilters);

  const segment = useMemo(() => filterPlayers(basePlayers, filters), [filters]);

  const insights = useMemo(() => getSegmentInsights(segment), [segment]);
  const diagnostics = useMemo(() => getSegmentDiagnostics(segment), [segment]);
  const personaDistribution = useMemo(() => getPersonaDistribution(segment), [segment]);
  const launchSignals = useMemo(() => inferLaunchMoments(segment), [segment]);
  const segmentScore = useMemo(() => computeSegmentScore(segment), [segment]);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,0.6fr)]">
        <FilterPanel filters={filters} onChange={setFilters} />
        <section className="gradient-card flex flex-col justify-between p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35rem] text-primary-300/80">Targeting Lab</p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Mobile Arena Targeting Sandbox</h1>
            <p className="mt-4 text-sm text-slate-300">
              Stress-test LiveOps sequencing, matchmaking envelopes, and monetization pushes across mobile arena cohorts. Mix telemetry filters to preview friction, stability, and launch momentum before shipping.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Active Segment Score</p>
              <p className="mt-1 text-4xl font-semibold text-primary-200">{segmentScore}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Players Included</p>
              <p className="mt-1 text-4xl font-semibold text-white">{segment.length}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full bg-primary-500/20 px-4 py-2 text-xs font-semibold text-primary-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Realtime Insights
            </div>
          </div>
        </section>
      </div>

      <SegmentSummary insights={insights} diagnostics={diagnostics} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
        <PlayersTable players={segment} />
        <PersonaRadar distribution={personaDistribution} />
      </div>

      <LaunchMoments signals={launchSignals} />
    </main>
  );
}
