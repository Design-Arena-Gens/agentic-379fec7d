"use client";

interface LaunchMomentsProps {
  signals: { label: string; impact: number }[];
}

export function LaunchMoments({ signals }: LaunchMomentsProps) {
  return (
    <section className="gradient-card p-6 lg:p-7">
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35rem] text-primary-300/80">Rhythm Planning</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Launch Moment Heatmap</h2>
        </div>
        <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-200">Live Ops</span>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {signals.map((signal) => (
          <article
            key={signal.label}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="absolute inset-0 glow-ring rounded-2xl bg-primary-500/10" aria-hidden />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-slate-400">{signal.label}</p>
              <p className="mt-3 text-4xl font-semibold text-white">{signal.impact}%</p>
              <p className="mt-2 text-xs text-slate-300">
                Share-of-interest for event beats calibrated to the selected cohort.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
