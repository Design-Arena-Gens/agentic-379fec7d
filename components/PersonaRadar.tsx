"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { PersonaBreakdown } from "@/lib/targeting";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PersonaRadarProps {
  distribution: PersonaBreakdown[];
}

export function PersonaRadar({ distribution }: PersonaRadarProps) {
  const data = useMemo(() => {
    const labels = distribution.map((entry) => entry.archetype);
    const values = distribution.map((entry) => entry.percentage);

    return {
      labels,
      datasets: [
        {
          label: "Persona Share",
          data: values,
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          borderColor: "rgba(59, 130, 246, 0.8)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(59, 130, 246, 1)",
          pointBorderColor: "rgba(148, 163, 184, 1)",
          pointHoverRadius: 4,
          tension: 0.3
        }
      ]
    };
  }, [distribution]);

  return (
    <section className="gradient-card p-6">
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35rem] text-primary-300/80">Archetype Density</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Persona Mapping</h2>
        </div>
        <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-200">
          {distribution.reduce((acc, item) => acc + item.percentage, 0)}% Coverage
        </span>
      </header>
      <div className="mt-6 h-72">
        <Radar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.parsed.r ?? 0}%`
                }
              }
            },
            scales: {
              r: {
                suggestedMin: 0,
                suggestedMax: 60,
                grid: {
                  color: "rgba(148, 163, 184, 0.35)"
                },
                angleLines: {
                  color: "rgba(148, 163, 184, 0.2)"
                },
                pointLabels: {
                  color: "rgba(226, 232, 240, 0.9)",
                  font: {
                    size: 12
                  }
                },
                ticks: {
                  showLabelBackdrop: false,
                  color: "rgba(148, 163, 184, 0.6)",
                  font: {
                    size: 10
                  }
                }
              }
            }
          }}
        />
      </div>
    </section>
  );
}
