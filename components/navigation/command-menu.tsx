"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search, Sparkles, SlidersHorizontal, Activity, ArrowRight, Github, ExternalLink } from "lucide-react";
import { StartupDeal } from "@/types/startup";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  startups: StartupDeal[];
  onSelectStartup: (startup: StartupDeal) => void;
  onTriggerScraper: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  startups,
  onSelectStartup,
  onTriggerScraper,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-2xl rounded-2xl border border-pando-border bg-pando-card shadow-2xl overflow-hidden z-10 border-emerald-500/30">
        <Command className="w-full bg-pando-card text-white">
          {/* Header Search Input */}
          <div className="flex items-center border-b border-pando-border px-4 py-3.5">
            <Search className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search startups, tech stack, sectors..."
              className="w-full bg-transparent text-sm text-white placeholder-pando-muted focus:outline-none font-sans"
            />
            <kbd className="rounded bg-pando-border/60 px-2 py-0.5 font-mono text-[10px] text-pando-muted">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-8 text-center text-xs text-pando-muted">
              No matching startups or commands found in Pando network.
            </Command.Empty>

            {/* Quick Actions Group */}
            <Command.Group heading="Root AI Actions" className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Command.Item
                onSelect={() => {
                  onTriggerScraper();
                  onClose();
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-white hover:bg-pando-hover cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-emerald-300">Run Underground Prospector Scraper</span>
                    <p className="text-[10px] text-pando-muted">Scan GitHub velocity, YC Directory, Product Hunt for new deals</p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-pando-muted group-hover:text-emerald-400 transition-colors" />
              </Command.Item>
            </Command.Group>

            {/* Discovered Startups Group */}
            <Command.Group heading="Tracked Startups" className="mt-3 px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-pando-muted">
              {startups.map((deal) => (
                <Command.Item
                  key={deal.id}
                  onSelect={() => {
                    onSelectStartup(deal);
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-white hover:bg-pando-hover cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={deal.logo}
                      alt={deal.name}
                      className="h-8 w-8 rounded-lg object-cover border border-pando-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-emerald-300">{deal.name}</span>
                        <span className="rounded bg-pando-border/50 px-1.5 py-0.5 text-[9px] font-mono text-pando-muted">
                          {deal.sector}
                        </span>
                      </div>
                      <p className="text-[11px] text-pando-muted line-clamp-1">{deal.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold font-mono border",
                        deal.thesisMatch.score >= 90
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      )}
                    >
                      {deal.thesisMatch.score}% Match
                    </span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-pando-border px-4 py-2 text-[11px] text-pando-muted bg-pando-dark/60 font-mono">
            <span>Pando Root Command Bar</span>
            <div className="flex items-center gap-3">
              <span>Use ↑↓ to navigate</span>
              <span>↵ Select</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
};
