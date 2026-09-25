"use client";

import React, { useState } from "react";
import { StartupDeal, PipelineStage } from "@/types/startup";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, ArrowUpDown, Search, Filter, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface DealTableProps {
  startups: StartupDeal[];
  onSelectStartup: (startup: StartupDeal) => void;
  onMoveStage: (startupId: string, newStage: PipelineStage) => void;
}

export const DealTable: React.FC<DealTableProps> = ({
  startups,
  onSelectStartup,
  onMoveStage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  const sectors = Array.from(new Set(startups.map((s) => s.sector)));

  const filteredDeals = startups.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || s.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="rounded-2xl border border-pando-border bg-pando-card/80 overflow-hidden shadow-xl">
      {/* Table Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-pando-border bg-pando-dark/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-pando-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter startups, tech stack..."
            className="w-full rounded-xl border border-pando-border bg-pando-card pl-9 pr-4 py-2 text-xs text-white placeholder-pando-muted focus:border-emerald-500/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-pando-muted hidden sm:block" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="rounded-xl border border-pando-border bg-pando-card px-3 py-2 text-xs text-white focus:border-emerald-500/50 focus:outline-none"
          >
            <option value="all">All Sectors ({startups.length})</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-pando-hover/60 border-b border-pando-border font-mono text-[11px] text-pando-muted uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Startup</th>
              <th className="py-3 px-4">Sector & Stage</th>
              <th className="py-3 px-4">Signal Source</th>
              <th className="py-3 px-4">Founders</th>
              <th className="py-3 px-4 text-center">Root Score</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pando-border/60">
            {filteredDeals.map((deal) => (
              <tr
                key={deal.id}
                onClick={() => onSelectStartup(deal)}
                className="hover:bg-pando-hover/50 cursor-pointer transition-colors group"
              >
                {/* Startup Name & Tagline */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={deal.logo}
                      alt={deal.name}
                      className="h-9 w-9 rounded-lg object-cover border border-pando-border shrink-0"
                    />
                    <div>
                      <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                        {deal.name}
                      </span>
                      <p className="text-pando-muted text-[11px] line-clamp-1 max-w-xs">{deal.tagline}</p>
                    </div>
                  </div>
                </td>

                {/* Sector & Stage Badge */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-white font-medium">{deal.sector}</span>
                    <span className="capitalize text-[10px] text-pando-muted font-mono">
                      Stage: {deal.stage.replace("_", " ")}
                    </span>
                  </div>
                </td>

                {/* Source Signal */}
                <td className="py-3.5 px-4">
                  <span className="capitalize font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-block">
                    {deal.source.replace("_", " ")}
                  </span>
                </td>

                {/* Founders */}
                <td className="py-3.5 px-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {deal.founders.map((f, idx) => (
                      <img
                        key={idx}
                        src={f.avatar}
                        alt={f.name}
                        title={`${f.name} (${f.role})`}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-pando-card object-cover"
                      />
                    ))}
                  </div>
                </td>

                {/* Root Score */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-mono font-bold border inline-block shadow-sm",
                      deal.thesisMatch.score >= 90
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    )}
                  >
                    {deal.thesisMatch.score}% Match
                  </span>
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStartup(deal);
                    }}
                    className="rounded-lg bg-pando-hover px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 hover:text-black transition-colors"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
