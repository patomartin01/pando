"use client";

import React from "react";
import { Activity, Sparkles, TrendingUp, Github, Zap, Radio } from "lucide-react";
import { StartupDeal } from "@/types/startup";
import { cn } from "@/lib/utils";

interface RadarFeedProps {
  startups: StartupDeal[];
  onSelectStartup: (startup: StartupDeal) => void;
  onRunScraper: () => void;
  isScraping: boolean;
}

export const RadarFeed: React.FC<RadarFeedProps> = ({
  startups,
  onSelectStartup,
  onRunScraper,
  isScraping,
}) => {
  return (
    <div className="rounded-2xl border border-pando-border bg-pando-card/90 p-4 sm:p-5 shadow-lg relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-glow">
            <Radio className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-sans text-base font-bold text-white tracking-tight">
                Live Underground Signal Radar
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-pando-muted">
              Monitoring GitHub velocity, YC directory, Product Hunt & stealth domains
            </p>
          </div>
        </div>

        <button
          onClick={onRunScraper}
          disabled={isScraping}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-lg",
            isScraping
              ? "bg-pando-hover text-pando-muted cursor-not-allowed border border-pando-border"
              : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 border border-emerald-400/40 shadow-glow"
          )}
        >
          <Sparkles className={cn("h-3.5 w-3.5", isScraping && "animate-spin text-emerald-400")} />
          <span>{isScraping ? "Scanning Underground Network..." : "Run AI Prospector"}</span>
        </button>
      </div>

      {/* Cards Horizon Scroller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {startups.slice(0, 3).map((deal) => (
          <div
            key={deal.id}
            onClick={() => onSelectStartup(deal)}
            className="group glass-panel glass-panel-hover rounded-xl p-3.5 cursor-pointer flex flex-col justify-between border border-pando-border hover:border-emerald-500/50 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={deal.logo}
                    alt={deal.name}
                    className="h-7 w-7 rounded-lg object-cover border border-pando-border"
                  />
                  <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {deal.name}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                  {deal.thesisMatch.score}% Match
                </span>
              </div>
              <p className="text-xs text-pando-muted line-clamp-2 mb-3">
                {deal.tagline}
              </p>
            </div>

            {/* Bottom Signal Tag */}
            <div className="flex items-center justify-between text-[10px] font-mono text-pando-muted pt-2 border-t border-pando-border/50">
              <span className="capitalize flex items-center gap-1 text-emerald-400 font-semibold">
                <Zap className="h-3 w-3" />
                {deal.source.replace("_", " ")}
              </span>
              <span>{deal.discoveredAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
