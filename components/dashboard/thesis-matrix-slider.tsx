"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, Sliders, Sparkles } from "lucide-react";
import { DynamicWeights } from "@/lib/engine/scoring";

interface ThesisMatrixSliderProps {
  onWeightsChange: (weights: DynamicWeights) => void;
}

export function ThesisMatrixSlider({ onWeightsChange }: ThesisMatrixSliderProps) {
  const [weights, setWeights] = useState<DynamicWeights>({
    teamPedigree: 35,
    technicalVelocity: 30,
    thesisVectorFit: 20,
    earlyTraction: 15,
  });

  const handleChange = (key: keyof DynamicWeights, val: number) => {
    const updated = { ...weights, [key]: val };
    setWeights(updated);
    onWeightsChange(updated);
  };

  const handleReset = () => {
    const defaultWeights: DynamicWeights = {
      teamPedigree: 35,
      technicalVelocity: 30,
      thesisVectorFit: 20,
      earlyTraction: 15,
    };
    setWeights(defaultWeights);
    onWeightsChange(defaultWeights);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Matriz de Ponderación de Tesis (Dynamic Weight Engine)
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Recálculo Instantáneo (Client-Side)
          </span>
          <button
            onClick={handleReset}
            className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Team Pedigree */}
        <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Pedigree del Equipo</span>
            <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {weights.teamPedigree}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.teamPedigree}
            onChange={(e) => handleChange("teamPedigree", Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[10px] text-neutral-500 font-mono">FAANG/Staff, Exits, PhDs</p>
        </div>

        {/* Technical Velocity */}
        <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Velocidad de Código</span>
            <span className="text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              {weights.technicalVelocity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.technicalVelocity}
            onChange={(e) => handleChange("technicalVelocity", Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <p className="text-[10px] text-neutral-500 font-mono">Commits, PRs, Contribuidores</p>
        </div>

        {/* Thesis Vector Fit */}
        <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Similitud Vectorial</span>
            <span className="text-violet-400 font-bold px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
              {weights.thesisVectorFit}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.thesisVectorFit}
            onChange={(e) => handleChange("thesisVectorFit", Number(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer"
          />
          <p className="text-[10px] text-neutral-500 font-mono">pgvector Cosine (3072d)</p>
        </div>

        {/* Early Traction */}
        <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Tracción Temprana</span>
            <span className="text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {weights.earlyTraction}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.earlyTraction}
            onChange={(e) => handleChange("earlyTraction", Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[10px] text-neutral-500 font-mono">Estrellas, HackerNews, PH</p>
        </div>
      </div>
    </div>
  );
}
