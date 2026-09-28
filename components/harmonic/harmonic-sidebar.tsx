"use client";

import React from "react";
import {
  Compass,
  Radio,
  Sliders,
  Columns3,
  Target,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Eye,
  Cpu,
  Terminal,
} from "lucide-react";
import { HarmonicNavView } from "./harmonic-navbar";

interface HarmonicSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeView: HarmonicNavView;
  onSelectView: (view: HarmonicNavView) => void;
  onSelectFilterPreset?: (preset: { query?: string; vertical?: string; stage?: string; minScore?: number }) => void;
  totalCompanies: number;
  stealthCount: number;
  highConvictionCount: number;
  onOpenCommand: () => void;
}

export function HarmonicSidebar({
  isOpen,
  onToggle,
  activeView,
  onSelectView,
  onSelectFilterPreset,
  totalCompanies,
  stealthCount,
  highConvictionCount,
  onOpenCommand,
}: HarmonicSidebarProps) {
  return (
    <aside
      className={`relative z-30 shrink-0 bg-white border-r border-[#e4e5eb] flex flex-col justify-between transition-all duration-300 ease-in-out select-none ${
        isOpen ? "w-64" : "w-18"
      }`}
    >
      {/* Top Header / Branding */}
      <div className="p-4 border-b border-[#f0f1f5] flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Pando Hexagon Logo Glyph */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5f42ff] via-[#3872ff] to-[#10b981] flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#5f42ff]/20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          {isOpen && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-[#040508]">
                  Pando
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#f1edff] text-[#5f42ff] font-bold">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#6f727a] truncate font-medium">
                Venture Intelligence
              </p>
            </div>
          )}
        </div>

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={onToggle}
          aria-label={isOpen ? "Colapsar barra lateral" : "Expandir barra lateral"}
          className="p-1.5 rounded-lg text-[#6f727a] hover:text-[#040508] hover:bg-[#f0f1f5] border border-transparent hover:border-[#e4e5eb] transition-all cursor-pointer"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Quick Command Trigger in Sidebar */}
        <button
          onClick={onOpenCommand}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f8f9fc] hover:bg-[#f0f1f5] border border-[#e4e5eb] text-xs text-[#6f727a] hover:text-[#040508] transition-all cursor-pointer shadow-2xs ${
            isOpen ? "justify-between" : "justify-center px-0"
          }`}
          title="Buscar startups y fundadores (⌘K)"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Search className="w-3.5 h-3.5 text-[#6f727a] shrink-0" />
            {isOpen && <span className="truncate">Buscar objetivo...</span>}
          </div>
          {isOpen && (
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-[#494b52] border border-[#e4e5eb]">
              ⌘K
            </kbd>
          )}
        </button>

        {/* Section 1: DISCOVERY & SOURCING */}
        <div className="space-y-1">
          {isOpen && (
            <div className="px-3 pb-1 text-[10px] font-bold font-mono tracking-wider text-[#82858c] uppercase">
              Discovery & Sourcing
            </div>
          )}

          {/* Scout Nav Item */}
          <button
            onClick={() => onSelectView("scout")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === "scout"
                ? "bg-[#040508] text-white shadow-xs"
                : "text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508]"
            } ${!isOpen && "justify-center px-0"}`}
            title="Scout Discovery"
          >
            <Compass className={`w-4 h-4 shrink-0 ${activeView === "scout" ? "text-white" : "text-[#5f42ff]"}`} />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between">
                <span>Scout AI</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeView === "scout" ? "bg-white/20 text-white" : "bg-[#f0f1f5] text-[#494b52]"
                }`}>
                  {totalCompanies}
                </span>
              </div>
            )}
          </button>

          {/* Tactical Radar 360 */}
          <button
            onClick={() => onSelectView("radar")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === "radar"
                ? "bg-[#040508] text-white shadow-xs"
                : "text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508]"
            } ${!isOpen && "justify-center px-0"}`}
            title="Radar Táctico 360°"
          >
            <Target className={`w-4 h-4 shrink-0 ${activeView === "radar" ? "text-white" : "text-[#5f42ff]"}`} />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between">
                <span>Tactical Radar</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#f1edff] text-[#5f42ff] font-bold">
                  360°
                </span>
              </div>
            )}
          </button>

          {/* Live Signals Stream */}
          <button
            onClick={() => onSelectView("signals")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === "signals"
                ? "bg-[#040508] text-white shadow-xs"
                : "text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508]"
            } ${!isOpen && "justify-center px-0"}`}
            title="Live Signals Feed"
          >
            <Radio className={`w-4 h-4 shrink-0 ${activeView === "signals" ? "text-white" : "text-[#16a34a]"}`} />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between">
                <span>Live Signals</span>
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              </div>
            )}
          </button>
        </div>

        {/* Section 2: DEAL FLOW & PIPELINE */}
        <div className="space-y-1">
          {isOpen && (
            <div className="px-3 pb-1 text-[10px] font-bold font-mono tracking-wider text-[#82858c] uppercase">
              Pipeline & Intelligence
            </div>
          )}

          {/* Pipeline Kanban */}
          <button
            onClick={() => onSelectView("kanban")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === "kanban"
                ? "bg-[#040508] text-white shadow-xs"
                : "text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508]"
            } ${!isOpen && "justify-center px-0"}`}
            title="Pipeline Kanban"
          >
            <Columns3 className={`w-4 h-4 shrink-0 ${activeView === "kanban" ? "text-white" : "text-[#2491ff]"}`} />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between">
                <span>Deal Pipeline</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#edf6ff] text-[#2491ff]">
                  7 Stages
                </span>
              </div>
            )}
          </button>

          {/* Thesis Matrix */}
          <button
            onClick={() => onSelectView("thesis")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === "thesis"
                ? "bg-[#040508] text-white shadow-xs"
                : "text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508]"
            } ${!isOpen && "justify-center px-0"}`}
            title="Thesis Matrix"
          >
            <Sliders className={`w-4 h-4 shrink-0 ${activeView === "thesis" ? "text-white" : "text-[#f59e0b]"}`} />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between">
                <span>Thesis Matrix</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#fef3c7] text-[#b45309]">
                  Weights
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Section 3: SAVED WATCHLISTS (Harmonic style) */}
        {isOpen && (
          <div className="space-y-1 pt-2">
            <div className="px-3 pb-1 text-[10px] font-bold font-mono tracking-wider text-[#82858c] uppercase">
              Saved Watches
            </div>

            <button
              onClick={() => {
                onSelectView("scout");
                onSelectFilterPreset?.({ minScore: 85 });
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-[#5f42ff]" />
                <span>High Conviction</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#5f42ff]">
                {highConvictionCount}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectView("scout");
                onSelectFilterPreset?.({ stage: "stealth" });
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#2491ff]" />
                <span>Stealth Trackers</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#2491ff]">
                {stealthCount}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectView("scout");
                onSelectFilterPreset?.({ vertical: "AI Infrastructure" });
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#8b5cf6]" />
                <span>AI Infrastructure</span>
              </div>
            </button>

            <button
              onClick={() => {
                onSelectView("scout");
                onSelectFilterPreset?.({ vertical: "Developer Tools" });
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#494b52] hover:bg-[#f5f6fa] hover:text-[#040508] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Developer Tools</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer / Partner Profile & Engine Status */}
      <div className="p-3 border-t border-[#f0f1f5] space-y-3 bg-[#fafbfe]">
        {isOpen && (
          <div className="p-2.5 rounded-xl bg-white border border-[#e4e5eb] space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6f727a] font-bold">
                PANDO FUND I
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#16a34a] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                Live
              </span>
            </div>
            <div className="text-[11px] text-[#494b52] leading-tight">
              35,420 startups monitorizadas activamente.
            </div>
          </div>
        )}

        {/* User Card */}
        <div className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-[#040508] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
            PM
          </div>
          {isOpen && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#040508] truncate">
                Patricio Martin
              </div>
              <div className="text-[10px] text-[#6f727a] truncate font-medium">
                General Partner
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
