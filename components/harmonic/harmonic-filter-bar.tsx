"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Kanban as KanbanIcon,
  X,
  Check,
  Shield,
  Zap,
} from "lucide-react";

interface HarmonicFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedVertical: string;
  onSelectVertical: (vert: string) => void;
  selectedStage: string;
  onSelectStage: (stage: string) => void;
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
    searchQuery ||
    selectedVertical !== "all" ||
    selectedStage !== "all" ||
    selectedSignalType !== "all" ||
    minScore > 0;

  return (
    <div className="w-full space-y-3">
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#0e1422]/80 border border-white/[0.08] backdrop-blur-md">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filtrar por nombre, tecnología o fundador..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Vertical / Sector */}
          <div className="relative">
            <select
              value={selectedVertical}
              onChange={(e) => onSelectVertical(e.target.value)}
              className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-200 text-xs font-mono py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:border-emerald-500/50 transition-all"
            >
              <option value="all">Sector: Todos</option>
              <option value="AI Infrastructure">AI Infrastructure</option>
              <option value="AI Security & Compliance">AI Security & Compliance</option>
              <option value="Developer Tools">Developer Tools</option>
              <option value="Observability & DevTools">Observability & DevTools</option>
              <option value="D2C & E-commerce Tools">D2C & E-commerce</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>

          {/* Stage */}
          <div className="relative">
            <select
              value={selectedStage}
              onChange={(e) => onSelectStage(e.target.value)}
              className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-200 text-xs font-mono py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:border-emerald-500/50 transition-all"
            >
              <option value="all">Etapa: Todas</option>
              <option value="stealth">Solo Stealth (Sigilo)</option>
              <option value="Pre-Seed">Pre-Seed</option>
              <option value="Seed">Seed</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>

          {/* Signal Type */}
          <div className="relative">
            <select
              value={selectedSignalType}
              onChange={(e) => onSelectSignalType(e.target.value)}
              className="appearance-none bg-black/40 hover:bg-black/60 border border-white/10 text-neutral-200 text-xs font-mono py-2 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:border-emerald-500/50 transition-all"
            >
              <option value="all">Señal: Todas</option>
              <option value="github_star_acceleration">Aceleración Stars (+1k)</option>
              <option value="commit_velocity_spike">Pico de Commits (&gt;200%)</option>
              <option value="community_hype_spike">Show HN Hype</option>
              <option value="stealth_domain_registration">WHOIS Stealth</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>

          {/* Fit Score Threshold */}
          <button
            onClick={() => onMinScoreChange(minScore === 85 ? 0 : 85)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
              minScore === 85
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 glow-emerald font-bold"
                : "bg-black/40 text-neutral-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>&gt;85% Alta Convicción</span>
          </button>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* View Switcher: Table / Cards / Kanban */}
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 self-end lg:self-auto">
          <button
            onClick={() => onViewModeChange("table")}
            title="Vista de Tabla (Harmonic)"
            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === "table"
                ? "bg-white/15 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <TableIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => onViewModeChange("cards")}
            title="Vista de Tarjetas"
            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === "cards"
                ? "bg-white/15 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          <button
            onClick={() => onViewModeChange("kanban")}
            title="Vista de Pipeline Kanban"
            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === "kanban"
                ? "bg-white/15 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <KanbanIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Discovery Counter Bar */}
      <div className="flex items-center justify-between px-1 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span>
            Mostrando <strong className="text-white">{displayCount}</strong> de{" "}
            <strong>{totalCount}</strong> compañías indexadas
          </span>
          {minScore > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
              Filtro: Score ≥ {minScore}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            35M+ Perfiles Globales Monitorizados
          </span>
        </div>
      </div>
    </div>
  );
}
