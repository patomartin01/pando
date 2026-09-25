"use client";

import React, { useState } from "react";
import { VCThesisConfig } from "@/types/startup";
import { SlidersHorizontal, Sparkles, CheckCircle2, ShieldAlert, DollarSign, Globe, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThesisBuilderProps {
  config: VCThesisConfig;
  onUpdateConfig: (newConfig: VCThesisConfig) => void;
  onRecalculateScores: () => void;
}

export const ThesisBuilder: React.FC<ThesisBuilderProps> = ({
  config,
  onUpdateConfig,
  onRecalculateScores,
}) => {
  const [localConfig, setLocalConfig] = useState<VCThesisConfig>(config);

  const handleWeightChange = (key: keyof VCThesisConfig["weightings"], value: number) => {
    const updated = {
      ...localConfig,
      weightings: {
        ...localConfig.weightings,
        [key]: value,
      },
    };
    setLocalConfig(updated);
    onUpdateConfig(updated);
  };

  return (
    <div className="rounded-2xl border border-pando-border bg-pando-card p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-pando-border pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-glow">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-sans text-xl font-bold text-white tracking-tight">
              Pando Investment Thesis Configuration
            </h2>
            <p className="text-xs text-pando-muted">
              Define your fund parameters, weightings and red flag filters to score deals automatically
            </p>
          </div>
        </div>

        <button
          onClick={onRecalculateScores}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-glow transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Recalculate All Deals</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Fund Specs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold text-pando-muted uppercase mb-1">
              Fund Name
            </label>
            <input
              type="text"
              value={localConfig.fundName}
              onChange={(e) => {
                const updated = { ...localConfig, fundName: e.target.value };
                setLocalConfig(updated);
                onUpdateConfig(updated);
              }}
              className="w-full rounded-xl border border-pando-border bg-pando-dark px-3.5 py-2.5 text-xs text-white focus:border-emerald-500/50 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-pando-muted uppercase mb-1">
                Fund Stage
              </label>
              <input
                type="text"
                value={localConfig.fundStage}
                onChange={(e) => {
                  const updated = { ...localConfig, fundStage: e.target.value };
                  setLocalConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full rounded-xl border border-pando-border bg-pando-dark px-3.5 py-2.5 text-xs text-white focus:border-emerald-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-pando-muted uppercase mb-1">
                Ticket Size
              </label>
              <input
                type="text"
                value={localConfig.ticketSize}
                onChange={(e) => {
                  const updated = { ...localConfig, ticketSize: e.target.value };
                  setLocalConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full rounded-xl border border-pando-border bg-pando-dark px-3.5 py-2.5 text-xs text-white focus:border-emerald-500/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-pando-muted uppercase mb-2">
              Target Sectors
            </label>
            <div className="flex flex-wrap gap-2">
              {localConfig.primarySectors.map((sector, idx) => (
                <span
                  key={idx}
                  className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-mono text-xs text-emerald-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-amber-400 uppercase mb-2">
              Excluded Red Flag Keywords
            </label>
            <div className="flex flex-wrap gap-2">
              {localConfig.excludedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1 font-mono text-xs text-rose-300 flex items-center gap-1.5"
                >
                  <ShieldAlert className="h-3 w-3 text-rose-400" />
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weighting Sliders */}
        <div className="rounded-xl border border-pando-border bg-pando-dark/60 p-5 space-y-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-400" />
            <span>AI Scoring Weightings (%)</span>
          </h3>

          {/* Team Weight */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-white">Founding Team Background</span>
              <span className="font-mono text-emerald-400 font-bold">{localConfig.weightings.team}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={localConfig.weightings.team}
              onChange={(e) => handleWeightChange("team", Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Market Weight */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-white">Market Size & TAM Opportunity</span>
              <span className="font-mono text-emerald-400 font-bold">{localConfig.weightings.market}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={localConfig.weightings.market}
              onChange={(e) => handleWeightChange("market", Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Traction Weight */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-white">Traction & Growth Velocity</span>
              <span className="font-mono text-emerald-400 font-bold">{localConfig.weightings.traction}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={localConfig.weightings.traction}
              onChange={(e) => handleWeightChange("traction", Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Tech Moat Weight */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-white">Technical Moat & IP</span>
              <span className="font-mono text-emerald-400 font-bold">{localConfig.weightings.techMoat}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={localConfig.weightings.techMoat}
              onChange={(e) => handleWeightChange("techMoat", Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
