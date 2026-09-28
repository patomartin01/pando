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

  const [scoutTab, setScoutTab] = useState<"companies" | "people" | "deals" | "markets">("companies");

  return (
    <div className="w-full rounded-2xl bg-white border border-[#e4e5eb] p-6 shadow-xs relative overflow-hidden">
      {/* Subtle top brand line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5f42ff] via-[#2491ff] to-[#38cc38]" />

      <div className="flex flex-col gap-4">
        {/* Title and prompt header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#040508] tracking-tight">
                  Pando Scout
                </h2>
                <span className="text-xs text-[#6f727a] font-normal">
                  AI Startup Discovery & Signals
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/20 font-semibold">
                  Autonomous
                </span>
              </div>
            </div>
          </div>

          {/* Scout Tabs: People, Companies, Deals, Markets (from harmonic.ai/scout) */}
          <div className="flex items-center gap-1 p-1 bg-[#f0f1f5] border border-[#e4e5eb] rounded-full self-start sm:self-auto text-xs font-semibold">
            {(["companies", "people", "deals", "markets"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setScoutTab(tab)}
                className={`px-3 py-1 rounded-full capitalize transition-all cursor-pointer ${
                  scoutTab === tab
                    ? "bg-white text-[#040508] shadow-xs"
                    : "text-[#6f727a] hover:text-[#040508]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Natural Language Prompt Input Box */}
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="relative flex items-center w-full rounded-2xl bg-[#f8f9fc] border border-[#d7d9e0] hover:border-[#abadb3] focus-within:border-[#5f42ff] focus-within:ring-3 focus-within:ring-[#5f42ff]/15 transition-all shadow-inner p-1.5">
            <Search className="w-5 h-5 text-[#82858c] ml-3.5 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Ask anything about startups or deploy Scouts (e.g. Find fast-growing AI agents in stealth founded by ex-Stripe or Databricks)..."
              className="w-full bg-transparent px-3.5 py-3 text-sm text-[#040508] font-medium placeholder-[#82858c] focus:outline-none"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue("");
                  onSearch("");
                }}
                className="text-xs text-[#6f727a] hover:text-[#040508] px-2 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
            {/* Harmonic's Exact Pill Search Button */}
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#040508] hover:bg-[#212226] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
            >
              <span>Search</span>
              <CornerDownLeft className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips (Harmonic Preset Prompts) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-0.5">
          <span className="text-xs text-[#6f727a] font-semibold shrink-0">
            Suggested:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputValue(preset.query || "");
                onSelectPreset(preset);
              }}
              className="px-3 py-1.5 rounded-full bg-[#f0f1f5] hover:bg-[#e4e5eb] border border-[#d7d9e0] text-xs font-medium text-[#212226] transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
