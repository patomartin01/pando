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
  Columns3,
} from "lucide-react";

export type HarmonicNavView = "scout" | "radar" | "signals" | "thesis" | "kanban";

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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090a0f]/90 backdrop-blur-xl">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brandmark & Tagline */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Harmonic Style Diamond / Hex Glyphs */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5f42ff] to-[#2491ff] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#5f42ff]/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  Harmonic
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5f42ff]/15 text-[#c4b5fd] border border-[#5f42ff]/30 font-medium">
                  Pando VC
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">
                Startup Database & Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Harmonic Standard) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-medium">
            <button
              onClick={() => onSelectView("scout")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === "scout"
                  ? "bg-white/10 text-white font-semibold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#5f42ff]" />
              <span>Scout</span>
            </button>

            <button
              onClick={() => onSelectView("radar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === "radar"
                  ? "bg-[#5f42ff]/20 text-[#c4b5fd] font-semibold shadow-sm border border-[#5f42ff]/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#5f42ff]" />
              <span>Tactical Radar</span>
            </button>

            <button
              onClick={() => onSelectView("signals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === "signals"
                  ? "bg-white/10 text-white font-semibold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Signals</span>
            </button>

            <button
              onClick={() => onSelectView("thesis")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === "thesis"
                  ? "bg-white/10 text-white font-semibold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Thesis Matrix</span>
            </button>

            <button
              onClick={() => onSelectView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeView === "kanban"
                  ? "bg-white/10 text-white font-semibold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Pipeline</span>
            </button>
          </nav>
        </div>

        {/* Right: Quick Command, Attio Status & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Command Trigger (⌘K) */}
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] text-xs text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search 35K+ companies...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-neutral-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Attio Connected Pill */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Attio CRM Synced</span>
          </div>

          {/* Trigger Scan Button */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5f42ff] hover:bg-[#5235f5] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isScanning ? "Scanning..." : "Scan Market"}</span>
          </button>

          {/* Partner User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/15 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              PM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
