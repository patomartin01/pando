"use client";

import React, { useEffect, useState } from "react";
import { StartupEntity } from "@/types/domain";
import {
  Search,
  Sparkles,
  Filter,
  FileText,
  X,
  ExternalLink,
  Command,
  ArrowRight,
  Send,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
  onTriggerScan: () => void;
  onFilterHighFit: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  startups,
  onSelectStartup,
  onTriggerScan,
  onFilterHighFit,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open triggered from parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStartups = startups.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.domain.toLowerCase().includes(query.toLowerCase()) ||
      s.primaryVertical.toLowerCase().includes(query.toLowerCase()) ||
      s.founderPedigree.some((p) => p.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl glass-panel border border-white/10 rounded-2xl p-4 z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 bg-black/50 rounded-xl border border-white/10">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            autoFocus
            type="text"
            placeholder="Escribe un comando o busca startups, dominios, fundadores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-3 font-mono text-xs pr-1">
          {/* Quick Actions */}
          {!query && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-neutral-500 font-bold px-2">
                Acciones Agénticas
              </span>
              <button
                onClick={() => {
                  onTriggerScan();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-neutral-200 hover:text-white transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Ejecutar Escaneo de Repositorios Emergentes en GitHub</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => {
                  onFilterHighFit();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-neutral-200 hover:text-white transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Filter className="w-4 h-4 text-emerald-400" />
                  <span>Filtrar solo con Match Score &gt; 85%</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}

          {/* Startups Search Results */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-neutral-500 font-bold px-2">
              Startups Indexadas ({filteredStartups.length})
            </span>
            {filteredStartups.map((startup) => (
              <button
                key={startup.id}
                onClick={() => {
                  onSelectStartup(startup);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-neutral-200 hover:text-white transition-colors group text-left border border-transparent hover:border-white/5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{startup.name}</span>
                    <span className="text-neutral-500 text-[11px]">{startup.domain}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold">
                      {startup.evaluation.matchScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">{startup.oneLiner}</p>
                </div>
                <span className="text-[10px] text-neutral-500">{startup.primaryVertical}</span>
              </button>
            ))}

            {filteredStartups.length === 0 && (
              <div className="py-6 text-center text-neutral-500 text-xs">
                No se encontraron startups para &quot;{query}&quot;.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
