"use client";

import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import type { SegmentDiagnostics, SegmentInsight } from "@/lib/targeting";

interface SegmentSummaryProps {
  insights: SegmentInsight[];
  diagnostics: SegmentDiagnostics;
}

export function SegmentSummary({ insights, diagnostics }: SegmentSummaryProps) {
  return (
    <section className="gradient-card p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35rem] text-primary-300/80">Arena Signal</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Segment Health Snapshot</h2>
        </div>
        <HealthGauge healthScore={diagnostics.healthScore} stressLevel={diagnostics.stressLevel} />
      </header>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => (
          <MetricCard key={insight.label} insight={insight} />
        ))}
      </div>

      <footer className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Live Ops Recommendations</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {diagnostics.recommendations.map((recommendation) => (
              <li key={recommendation} className="flex items-start gap-3">
                <ArrowUpCircleIcon className="mt-0.5 h-5 w-5 text-primary-300" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Match Confidence</h3>
          <p className="mt-4 text-4xl font-semibold text-white">{diagnostics.matchConfidence}%</p>
          <p className="mt-2 text-sm text-slate-300">
            Confidence expresses lobby outcome reliability based on MMR variance, latency stability, and behavioral cohesion across the filtered cohort.
          </p>
        </div>
      </footer>
    </section>
  );
}

function MetricCard({ insight }: { insight: SegmentInsight }) {
  const Icon = insight.positive ? ArrowUpCircleIcon : ArrowDownCircleIcon;
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="absolute inset-0 glow-ring rounded-2xl bg-primary-500/5" aria-hidden />
      <div className="relative flex items-center gap-4">
        <Icon className={`h-10 w-10 ${insight.positive ? "text-primary-300" : "text-pink-300"}`} />
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">{insight.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {insight.value}
            <span className="ml-1 text-base font-normal text-slate-400">{insight.unit}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

function HealthGauge({ healthScore, stressLevel }: { healthScore: number; stressLevel: SegmentDiagnostics["stressLevel"] }) {
  const capped = Math.max(0, Math.min(100, healthScore));
  const strokeDasharray = `${capped} ${100 - capped}`;
  const color = capped >= 75 ? "text-emerald-300" : capped >= 50 ? "text-amber-300" : "text-rose-300";

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90 text-slate-700">
        <path
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="3.5"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`${color} stroke-current`}
          strokeLinecap="round"
          strokeWidth="3.5"
          fill="none"
          strokeDasharray={strokeDasharray}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">Health Score</p>
        <p className="mt-1 text-3xl font-semibold text-white">{capped}</p>
        <span className={`text-xs font-semibold uppercase tracking-wide ${color}`}>{stressLevel}</span>
      </div>
    </div>
  );
}
