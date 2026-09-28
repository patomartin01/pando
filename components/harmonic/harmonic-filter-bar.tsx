"use client";

import React from "react";
import {
  Filter,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  Columns3,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

interface HarmonicFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedVertical: string;
  onSelectVertical: (v: string) => void;
  selectedStage: string;
  onSelectStage: (s: string) => void;
  selectedSignalType: string;
  onSelectSignalType: (sig: string) => void;
  minScore: number;
  onMinScoreChange: (score: number) => void;
  displayCount: number;
  totalCount: number;
  viewMode: "table" | "cards" | "kanban";
  onViewModeChange: (mode: "table" | "cards" | "kanban") => void;
  onResetFilters: () => void;
}

export function HarmonicFilterBar({
  searchQuery,
  onSearchChange,
  selectedVertical,
  onSelectVertical,
  selectedStage,
  onSelectStage,
  selectedSignalType,
  onSelectSignalType,
  minScore,
  onMinScoreChange,
  displayCount,
  totalCount,
  viewMode,
  onViewModeChange,
  onResetFilters,
}: HarmonicFilterBarProps) {
  const hasActiveFilters =
    searchQuery !== "" ||
    selectedVertical !== "all" ||
    selectedStage !== "all" ||
    selectedSignalType !== "all" ||
    minScore > 0;

  return (
    <div className="w-full space-y-3">
      {/* Primary Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-[#10121a] border border-white/[0.08] shadow-sm">
        {/* Left: Filter Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium pl-1 pr-2 border-r border-white/10 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#a594fd]" />
            <span>Filters</span>
          </div>

          {/* Sector Selector */}
          <div className="relative">
            <select
              value={selectedVertical}
              onChange={(e) => onSelectVertical(e.target.value)}
              className="appearance-none bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] hover:border-white/[0.18] rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-neutral-200 focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors"
            >
              <option value="all" className="bg-[#10121a] text-white">All Sectors</option>
              <option value="AI Infrastructure" className="bg-[#10121a] text-white">AI Infrastructure</option>
              <option value="Developer Tools" className="bg-[#10121a] text-white">Developer Tools</option>
              <option value="AI Security" className="bg-[#10121a] text-white">AI Security & WAF</option>
              <option value="Autonomous Agents" className="bg-[#10121a] text-white">Autonomous Agents</option>
              <option value="Developer Productivity" className="bg-[#10121a] text-white">Dev Productivity</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Stage Selector */}
          <div className="relative">
            <select
              value={selectedStage}
              onChange={(e) => onSelectStage(e.target.value)}
              className="appearance-none bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] hover:border-white/[0.18] rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-neutral-200 focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors"
            >
              <option value="all" className="bg-[#10121a] text-white">All Stages</option>
              <option value="stealth" className="bg-[#10121a] text-white">Stealth Mode Only</option>
              <option value="Pre-Seed" className="bg-[#10121a] text-white">Pre-Seed</option>
              <option value="Seed" className="bg-[#10121a] text-white">Seed</option>
              <option value="Series A" className="bg-[#10121a] text-white">Series A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Signal Type */}
          <div className="relative">
            <select
              value={selectedSignalType}
              onChange={(e) => onSelectSignalType(e.target.value)}
              className="appearance-none bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] hover:border-white/[0.18] rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-neutral-200 focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors"
            >
              <option value="all" className="bg-[#10121a] text-white">All Signals</option>
              <option value="GITHUB_STAR_ACCELERATION" className="bg-[#10121a] text-white">GitHub Star Velocity</option>
              <option value="WHOIS_STEALTH_REGISTRATION" className="bg-[#10121a] text-white">WHOIS Stealth Detections</option>
              <option value="TALENT_DEPARTURE_SWARM" className="bg-[#10121a] text-white">Senior Talent Departures</option>
              <option value="HACKERNEWS_SHOW_VIRAL" className="bg-[#10121a] text-white">Hacker News Viral</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Minimum Thesis Fit */}
          <button
            onClick={() => onMinScoreChange(minScore === 85 ? 0 : 85)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              minScore >= 85
                ? "bg-[#5f42ff]/20 text-[#c4b5fd] border border-[#5f42ff]/40 font-semibold"
                : "bg-white/[0.04] hover:bg-white/[0.07] text-neutral-300 border border-white/[0.09]"
            }`}
          >
            <span>&gt;85% Thesis Fit</span>
            {minScore >= 85 && <span className="w-1.5 h-1.5 rounded-full bg-[#5f42ff]" />}
          </button>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: View Switchers & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-mono">
            <strong className="text-white font-bold">{displayCount}</strong> of {totalCount} companies
          </span>

          <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => onViewModeChange("table")}
              title="Table View"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("cards")}
              title="Cards View"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("kanban")}
              title="Pipeline Kanban"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
