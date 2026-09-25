"use client";

import React from "react";
import {
  Compass,
  Radio,
  Sliders,
  BookmarkCheck,
  Search,
  Sparkles,
  Database,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Target,
  Network,
  Cpu,
} from "lucide-react";

export type HarmonicNavView = "scout" | "radar" | "network" | "signals" | "thesis" | "kanban";

interface HarmonicNavbarProps {
  activeView: HarmonicNavView;
  onSelectView: (view: HarmonicNavView) => void;
  onOpenCommand: () => void;
  onTriggerScan: () => void;
  isScanning: boolean;
  totalCompanies: number;
  stealthCount: number;
}

export function HarmonicNavbar({
  activeView,
  onSelectView,
  onOpenCommand,
  onTriggerScan,
  isScanning,
  totalCompanies,
  stealthCount,
}: HarmonicNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070a12]/95 backdrop-blur-2xl">
      {/* Top Utility Bar */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brandmark & Tagline */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-black font-black font-mono shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <span className="text-lg">P</span>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-300 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white font-mono">
                  PANDO
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold tracking-wider">
                  Harmonic Engine
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono tracking-tight">
                Autonomous Frontier Venture Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Harmonic Extended Suite) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-xs font-mono">
            <button
              onClick={() => onSelectView("scout")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "scout"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scout</span>
            </button>

            <button
              onClick={() => onSelectView("radar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "radar"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold shadow-sm border border-emerald-500/40"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Radar 360°</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => onSelectView("network")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "network"
                  ? "bg-violet-500/20 text-violet-300 font-bold shadow-sm border border-violet-500/40"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Network className="w-3.5 h-3.5 text-violet-400" />
              <span>Talent DNA</span>
            </button>

            <button
              onClick={() => onSelectView("signals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "signals"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold shadow-sm border border-cyan-500/40"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Signals</span>
            </button>

            <button
              onClick={() => onSelectView("thesis")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "thesis"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Thesis Matrix</span>
            </button>

            <button
              onClick={() => onSelectView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === "kanban"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pipeline</span>
            </button>
          </nav>
        </div>

        {/* Center: Harmonic Global Search Bar */}
        <div className="flex-1 max-w-md hidden lg:block">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>Buscar empresas, fundadores, repos...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 font-mono border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Scraper trigger, CRM state & User partner */}
        <div className="flex items-center gap-3">
          {/* Ingestion Worker Trigger */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isScanning ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">
              {isScanning ? "Ingiriendo..." : "Escanear Fuentes"}
            </span>
          </button>

          {/* Attio CRM Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Database className="w-3 h-3 text-emerald-400" />
            <span>Attio CRM</span>
          </div>

          {/* VC Partner Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center border border-white/15 shadow-sm">
              PM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
