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
  Bell,
  Check,
} from "lucide-react";

interface HarmonicNavbarProps {
  activeView: "scout" | "signals" | "thesis" | "kanban";
  onSelectView: (view: "scout" | "signals" | "thesis" | "kanban") => void;
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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl">
      {/* Top Utility Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brandmark & Tagline */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-black font-black font-mono shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <span>P</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white font-mono">
                  PANDO
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold tracking-wider">
                  Harmonic Engine
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono tracking-tight">
                The Startup Discovery Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Harmonic Scout Architecture) */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs font-mono">
            <button
              onClick={() => onSelectView("scout")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeView === "scout"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scout Discovery</span>
            </button>

            <button
              onClick={() => onSelectView("signals")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeView === "signals"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Signals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            <button
              onClick={() => onSelectView("thesis")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeView === "thesis"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-violet-400" />
              <span>Thesis Matrix</span>
            </button>

            <button
              onClick={() => onSelectView("kanban")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                activeView === "kanban"
                  ? "bg-white/10 text-white font-bold shadow-sm border border-white/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Deal Pipeline</span>
            </button>
          </nav>
        </div>

        {/* Center: Harmonic Global Search Bar */}
        <div className="flex-1 max-w-md hidden lg:block">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-neutral-400 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
              <span className="truncate">Buscar entre 35,000+ startups, repos y fundadores...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-neutral-300 font-mono border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Telemetry & Status Badges */}
        <div className="flex items-center gap-3">
          {/* Attio CRM Integration Status */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span>Attio CRM:</span>
            <span className="text-emerald-400 font-bold">Conectado</span>
          </div>

          {/* Trigger Scraping Workers */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin text-emerald-400" : ""}`} />
            <span className="hidden sm:inline">{isScanning ? "Escaneando..." : "Escanear Ecosistema"}</span>
          </button>

          {/* Partner Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xs font-bold font-mono text-white ring-2 ring-white/10">
              PM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
