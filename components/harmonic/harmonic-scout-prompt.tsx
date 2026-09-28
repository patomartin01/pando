"use client";

import React, { useState } from "react";
import { Sparkles, Search, ArrowRight, CornerDownLeft, SlidersHorizontal, RefreshCw } from "lucide-react";

interface HarmonicScoutPromptProps {
  onSearch: (query: string) => void;
  onSelectPreset: (preset: { query?: string; vertical?: string; stage?: string; minScore?: number }) => void;
  currentQuery: string;
  totalCompanies: number;
}

const PRESET_QUERIES = [
  {
    label: "✨ Stealth ex-Databricks / Stripe",
    badge: "Stealth",
    query: "Databricks",
    stage: "stealth",
    minScore: 85,
  },
  {
    label: "📈 High GitHub Star Acceleration (>1,000 ⭐/7d)",
    badge: "Breakout",
    query: "Rust",
    minScore: 80,
  },
  {
    label: "🛡️ Autonomous AI Security & WAF",
    badge: "Security",
    vertical: "AI Security",
    minScore: 80,
  },
  {
    label: "🎯 High Thesis Conviction (>85% Fit)",
    badge: "Top 5%",
    minScore: 85,
  },
];

export function HarmonicScoutPrompt({
  onSearch,
  onSelectPreset,
  currentQuery,
  totalCompanies,
}: HarmonicScoutPromptProps) {
  const [inputValue, setInputValue] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#131622] to-[#0e1017] border border-white/[0.09] p-5 shadow-xl relative overflow-hidden">
      {/* Subtle top specular accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#5f42ff]/50 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-3.5">
        {/* Title and prompt header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#5f42ff]/15 text-[#a594fd] border border-[#5f42ff]/25">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                Harmonic Scout AI
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5f42ff]/15 text-[#c4b5fd] border border-[#5f42ff]/30 font-medium">
                  Natural Language Search
                </span>
              </h2>
            </div>
          </div>
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Searching across 35,000+ startups & founders
          </span>
        </div>

        {/* Natural Language Prompt Input */}
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="relative flex items-center w-full rounded-xl bg-[#090a0f]/90 border border-white/[0.12] focus-within:border-[#5f42ff] focus-within:ring-2 focus-within:ring-[#5f42ff]/20 transition-all shadow-inner">
            <Search className="w-4 h-4 text-neutral-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="E.g. Fast-growing AI infrastructure startups in stealth founded by ex-Databricks or Stripe engineers..."
              className="w-full bg-transparent px-3.5 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("");
                  onSearch("");
                }}
                className="text-xs text-neutral-400 hover:text-white px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="mr-2 px-3 py-1.5 rounded-lg bg-[#5f42ff] hover:bg-[#5235f5] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>Search</span>
              <CornerDownLeft className="w-3 h-3 text-white/70" />
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-0.5 pb-1">
          <span className="text-[11px] text-neutral-500 font-medium shrink-0 flex items-center gap-1">
            Try:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputValue(preset.query || "");
                onSelectPreset(preset);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-xs text-neutral-300 hover:text-white transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
