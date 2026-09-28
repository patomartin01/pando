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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-[#e4e5eb] shadow-xs">
        {/* Left: Filter Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#6f727a] font-semibold pl-1 pr-2.5 border-r border-[#e4e5eb] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5f42ff]" />
            <span>Filters</span>
          </div>

          {/* Sector Selector */}
          <div className="relative">
            <select
              value={selectedVertical}
              onChange={(e) => onSelectVertical(e.target.value)}
              className="appearance-none bg-[#f0f1f5] hover:bg-[#e4e5eb] border border-[#d7d9e0] rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-[#040508] focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors shadow-2xs"
            >
              <option value="all">All Sectors</option>
              <option value="AI Infrastructure">AI Infrastructure</option>
              <option value="Developer Tools">Developer Tools</option>
              <option value="AI Security">AI Security & WAF</option>
              <option value="Autonomous Agents">Autonomous Agents</option>
              <option value="Developer Productivity">Dev Productivity</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6f727a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Stage Selector */}
          <div className="relative">
            <select
              value={selectedStage}
              onChange={(e) => onSelectStage(e.target.value)}
              className="appearance-none bg-[#f0f1f5] hover:bg-[#e4e5eb] border border-[#d7d9e0] rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-[#040508] focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors shadow-2xs"
            >
              <option value="all">All Stages</option>
              <option value="stealth">Stealth Mode Only</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6f727a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Signal Type */}
          <div className="relative">
            <select
              value={selectedSignalType}
              onChange={(e) => onSelectSignalType(e.target.value)}
              className="appearance-none bg-[#f0f1f5] hover:bg-[#e4e5eb] border border-[#d7d9e0] rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-[#040508] focus:outline-none focus:border-[#5f42ff] cursor-pointer transition-colors shadow-2xs"
            >
              <option value="all">All Signals</option>
              <option value="GITHUB_STAR_ACCELERATION">GitHub Star Velocity</option>
              <option value="WHOIS_STEALTH_REGISTRATION">WHOIS Stealth Detections</option>
              <option value="TALENT_DEPARTURE_SWARM">Senior Talent Departures</option>
              <option value="HACKERNEWS_SHOW_VIRAL">Hacker News Viral</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6f727a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Minimum Thesis Fit */}
          <button
            onClick={() => onMinScoreChange(minScore === 85 ? 0 : 85)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              minScore >= 85
                ? "bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/40"
                : "bg-[#f0f1f5] hover:bg-[#e4e5eb] text-[#212226] border border-[#d7d9e0]"
            }`}
          >
            <span>&gt;85% Thesis Fit</span>
            {minScore >= 85 && <span className="w-1.5 h-1.5 rounded-full bg-[#5f42ff]" />}
          </button>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-1.5 rounded-xl text-xs text-[#6f727a] hover:text-[#040508] hover:bg-[#f0f1f5] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: View Switchers & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6f727a] font-medium">
            <strong className="text-[#040508] font-bold">{displayCount}</strong> of {totalCount} companies
          </span>

          <div className="flex items-center p-1 rounded-xl bg-[#f0f1f5] border border-[#e4e5eb]">
            <button
              onClick={() => onViewModeChange("table")}
              title="Table View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-[#040508] shadow-xs font-bold"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("cards")}
              title="Cards View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white text-[#040508] shadow-xs font-bold"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("kanban")}
              title="Pipeline Kanban"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-white text-[#040508] shadow-xs font-bold"
                  : "text-[#6f727a] hover:text-[#040508]"
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
