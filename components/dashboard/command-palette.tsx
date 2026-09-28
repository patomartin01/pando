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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 font-sans">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white border border-[#e4e5eb] rounded-2xl p-4 z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-3.5 py-2.5 bg-[#f8f9fc] rounded-xl border border-[#e4e5eb]">
          <Search className="w-4 h-4 text-[#82858c]" />
          <input
            autoFocus
            type="text"
            placeholder="Escribe un comando o busca startups, dominios, fundadores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#040508] placeholder-[#82858c] focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#6f727a] bg-[#f0f1f5] border border-[#e4e5eb] rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-3 text-xs pr-1">
          {/* Quick Actions */}
          {!query && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-[#6f727a] font-bold px-2">
                Acciones Agénticas
              </span>
              <button
                onClick={() => {
                  onTriggerScan();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f0f1f5] text-[#212226] hover:text-[#040508] transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#5f42ff]" />
                  <span>Ejecutar Escaneo de Repositorios Emergentes en GitHub</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#5f42ff]" />
              </button>

              <button
                onClick={() => {
                  onFilterHighFit();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f0f1f5] text-[#212226] hover:text-[#040508] transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Filter className="w-4 h-4 text-[#16a34a]" />
                  <span>Filtrar solo con Match Score &gt; 85%</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#16a34a]" />
              </button>
            </div>
          )}

          {/* Startups Search Results */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[#6f727a] font-bold px-2">
              Startups Indexadas ({filteredStartups.length})
            </span>
            {filteredStartups.map((startup) => (
              <button
                key={startup.id}
                onClick={() => {
                  onSelectStartup(startup);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f8f9fc] text-[#212226] transition-colors group text-left border border-transparent hover:border-[#e4e5eb] cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#040508] group-hover:text-[#5f42ff] transition-colors">{startup.name}</span>
                    <span className="text-[#6f727a] text-[11px] font-mono">{startup.domain}</span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-[#f1edff] text-[#5f42ff] font-bold border border-[#5f42ff]/20">
                      {startup.evaluation.matchScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#494b52] line-clamp-1">{startup.oneLiner}</p>
                </div>
                <span className="text-[10px] text-[#6f727a]">{startup.primaryVertical}</span>
              </button>
            ))}

            {filteredStartups.length === 0 && (
              <div className="py-6 text-center text-[#6f727a] text-xs">
                No se encontraron startups para &quot;{query}&quot;.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
