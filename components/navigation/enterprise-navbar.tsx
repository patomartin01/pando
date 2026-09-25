"use client";

import React from "react";
import {
  Sparkles,
  Command,
  Activity,
  Layers,
  Database,
  Search,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";

interface EnterpriseNavbarProps {
  onOpenCommand: () => void;
  onTriggerScan: () => void;
  isScanning: boolean;
  totalStartups: number;
  activeThesisName: string;
}

export function EnterpriseNavbar({
  onOpenCommand,
  onTriggerScan,
  isScanning,
  totalStartups,
  activeThesisName,
}: EnterpriseNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#08090a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brandmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-glow">
            <div className="w-full h-full bg-[#08090a] rounded-xl flex items-center justify-center">
              <span className="font-mono font-black text-emerald-400 text-base tracking-tight">
                P
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">
                PANDO
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO ENGINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-400 hidden sm:block">
              Underground Deal Flow Root Network
            </p>
          </div>
        </div>

        {/* Center: Active Thesis Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-400">TESIS:</span>
          <span className="text-white font-semibold truncate max-w-xs">
            {activeThesisName}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search ⌘K */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buscar...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-black/40 border border-white/10 text-[10px]">
              ⌘K
            </kbd>
          </button>

          {/* Trigger Scan Button */}
          <button
            disabled={isScanning}
            onClick={onTriggerScan}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all glow-emerald disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Escaneando..." : "Escanear Señales"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
