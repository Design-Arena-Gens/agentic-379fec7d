"use client";

import type { PlayerProfile } from "@/data/players";

interface PlayersTableProps {
  players: PlayerProfile[];
}

export function PlayersTable({ players }: PlayersTableProps) {
  return (
    <section className="gradient-card p-6 lg:p-7">
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35rem] text-primary-300/80">Telemetry</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Player Cohort Preview</h2>
        </div>
        <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-200">
          {players.length} profiles
        </span>
      </header>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Persona</th>
                <th className="px-4 py-3">Win%</th>
                <th className="px-4 py-3">MMR</th>
                <th className="px-4 py-3">Latency</th>
                <th className="px-4 py-3">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map((player) => (
                <tr key={player.id} className="bg-slate-950/40 hover:bg-primary-500/5">
                  <td className="px-4 py-3 font-semibold text-white">{player.gamerTag}</td>
                  <td className="px-4 py-3">{player.region}</td>
                  <td className="px-4 py-3">{player.deviceTier}</td>
                  <td className="px-4 py-3">{player.playstyle}</td>
                  <td className="px-4 py-3">{player.winRate}%</td>
                  <td className="px-4 py-3">{player.mmr}</td>
                  <td className="px-4 py-3">{player.latency} ms</td>
                  <td className="px-4 py-3">{player.preferredMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
