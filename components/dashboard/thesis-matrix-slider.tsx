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
    <div className="bg-white p-6 rounded-2xl border border-[#e4e5eb] shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f1f5] pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#5f42ff]" />
          <h4 className="font-bold text-xs text-[#040508] uppercase tracking-wider">
            Matriz de Ponderación de Tesis (Dynamic Weight Engine)
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#15803d] flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            Recálculo Instantáneo (Client-Side)
          </span>
          <button
            onClick={handleReset}
            className="text-[11px] font-semibold text-[#6f727a] hover:text-[#040508] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Team Pedigree */}
        <div className="space-y-2.5 bg-[#f8f9fc] p-4 rounded-xl border border-[#e4e5eb]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#494b52] font-medium">Pedigree del Equipo</span>
            <span className="text-[#5f42ff] font-bold font-mono px-2 py-0.5 rounded-full bg-[#f1edff] border border-[#5f42ff]/30">
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
            className="w-full accent-[#5f42ff] cursor-pointer"
          />
          <p className="text-[10px] text-[#6f727a] font-mono">FAANG/Staff, Exits, PhDs</p>
        </div>

        {/* Technical Velocity */}
        <div className="space-y-2.5 bg-[#f8f9fc] p-4 rounded-xl border border-[#e4e5eb]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#494b52] font-medium">Velocidad de Código</span>
            <span className="text-[#2491ff] font-bold font-mono px-2 py-0.5 rounded-full bg-[#edf6ff] border border-[#2491ff]/30">
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
            className="w-full accent-[#2491ff] cursor-pointer"
          />
          <p className="text-[10px] text-[#6f727a] font-mono">Commits, PRs, Contribuidores</p>
        </div>

        {/* Thesis Vector Fit */}
        <div className="space-y-2.5 bg-[#f8f9fc] p-4 rounded-xl border border-[#e4e5eb]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#494b52] font-medium">Similitud Vectorial</span>
            <span className="text-[#5f42ff] font-bold font-mono px-2 py-0.5 rounded-full bg-[#f1edff] border border-[#5f42ff]/30">
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
            className="w-full accent-[#5f42ff] cursor-pointer"
          />
          <p className="text-[10px] text-[#6f727a] font-mono">pgvector Cosine (3072d)</p>
        </div>

        {/* Early Traction */}
        <div className="space-y-2.5 bg-[#f8f9fc] p-4 rounded-xl border border-[#e4e5eb]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#494b52] font-medium">Tracción Temprana</span>
            <span className="text-[#15803d] font-bold font-mono px-2 py-0.5 rounded-full bg-[#eafbe9] border border-[#38cc38]/30">
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
            className="w-full accent-[#16a34a] cursor-pointer"
          />
          <p className="text-[10px] text-[#6f727a] font-mono">Estrellas, HackerNews, PH</p>
        </div>
      </div>
    </div>
  );
}
