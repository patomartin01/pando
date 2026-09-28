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
    <header className="sticky top-0 z-40 w-full border-b border-[#e4e5eb] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brandmark & Tagline */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Harmonic Style Hex / Polygon Glyph */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5f42ff] to-[#2491ff] flex items-center justify-center text-white font-black text-sm shadow-sm shadow-[#5f42ff]/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#040508]">
                  Harmonic
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/20 font-semibold">
                  Pando VC
                </span>
              </div>
              <p className="text-[11px] text-[#6f727a] font-medium">
                Startup Database & Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Harmonic Standard Pill Navigation) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#f0f1f5] border border-[#e4e5eb] rounded-full text-xs font-medium">
            <button
              onClick={() => onSelectView("scout")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "scout"
                  ? "bg-white text-[#040508] font-bold shadow-xs border border-[#e4e5eb]"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#5f42ff]" />
              <span>Scout</span>
            </button>

            <button
              onClick={() => onSelectView("radar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "radar"
                  ? "bg-white text-[#040508] font-bold shadow-xs border border-[#e4e5eb]"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#5f42ff]" />
              <span>Tactical Radar</span>
            </button>

            <button
              onClick={() => onSelectView("signals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "signals"
                  ? "bg-white text-[#040508] font-bold shadow-xs border border-[#e4e5eb]"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#38cc38]" />
              <span>Live Signals</span>
            </button>

            <button
              onClick={() => onSelectView("thesis")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "thesis"
                  ? "bg-white text-[#040508] font-bold shadow-xs border border-[#e4e5eb]"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Thesis Matrix</span>
            </button>

            <button
              onClick={() => onSelectView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "kanban"
                  ? "bg-white text-[#040508] font-bold shadow-xs border border-[#e4e5eb]"
                  : "text-[#6f727a] hover:text-[#040508]"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5 text-[#2491ff]" />
              <span>Pipeline</span>
            </button>
          </nav>
        </div>

        {/* Right: Quick Command, Attio Status & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Command Trigger (⌘K) */}
          <button
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-[#f5f6fa] border border-[#e4e5eb] text-xs text-[#6f727a] hover:text-[#040508] transition-all cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#6f727a]" />
            <span>Search 35K+ companies...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#f0f1f5] text-[10px] font-mono text-[#494b52] border border-[#e4e5eb]">
              ⌘K
            </kbd>
          </button>

          {/* Attio Connected Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eafbe9] border border-[#38cc38]/30 text-xs text-[#15803d] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38cc38] animate-pulse" />
            <span>Attio CRM Synced</span>
          </div>

          {/* Trigger Scan Button (Harmonic Signature Pill Button) */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#040508] hover:bg-[#212226] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isScanning ? "Scanning..." : "Scan Market"}</span>
          </button>

          {/* Partner User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#e4e5eb]">
            <div className="w-8 h-8 rounded-full bg-[#f0f1f5] border border-[#e4e5eb] flex items-center justify-center text-xs font-bold text-[#040508] shadow-xs">
              PM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
