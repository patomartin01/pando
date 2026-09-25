"use client";

import React from "react";
import { StartupDeal, PipelineStage } from "@/types/startup";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, Sparkles, Building2, MapPin, DollarSign, ArrowUpRight } from "lucide-react";

interface KanbanBoardProps {
  startups: StartupDeal[];
  onSelectStartup: (startup: StartupDeal) => void;
  onMoveStage: (startupId: string, newStage: PipelineStage) => void;
}

const STAGES: { id: PipelineStage; label: string; color: string }[] = [
  { id: "sourced", label: "Sprouted (Sourced)", color: "text-slate-400 border-slate-700 bg-slate-900/40" },
  { id: "root_enriched", label: "Root Enriched", color: "text-cyan-400 border-cyan-800 bg-cyan-950/30" },
  { id: "thesis_matched", label: "Thesis Matched", color: "text-emerald-400 border-emerald-800 bg-emerald-950/30" },
  { id: "partner_review", label: "Partner Review", color: "text-violet-400 border-violet-800 bg-violet-950/30" },
  { id: "term_sheet", label: "Term Sheet / Invested", color: "text-amber-400 border-amber-800 bg-amber-950/30" },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  startups,
  onSelectStartup,
  onMoveStage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 scrollbar-thin">
      {STAGES.map((stage) => {
        const stageDeals = startups.filter((s) => s.stage === stage.id);

        return (
          <div
            key={stage.id}
            className="flex flex-col rounded-2xl border border-pando-border bg-pando-card/60 p-3 min-w-[260px] min-h-[500px]"
          >
            {/* Stage Header */}
            <div className="flex items-center justify-between px-2 py-2 mb-3 border-b border-pando-border/60">
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", stage.color.split(" ")[0].replace("text-", "bg-"))} />
                <span className="font-mono text-xs font-bold text-white tracking-tight">
                  {stage.label}
                </span>
              </div>
              <span className="rounded-full bg-pando-hover px-2 py-0.5 font-mono text-[10px] font-bold text-pando-muted">
                {stageDeals.length}
              </span>
            </div>

            {/* Cards Column */}
            <div className="flex flex-1 flex-col gap-3">
              {stageDeals.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-pando-border/50 p-4 text-center text-xs text-pando-muted">
                  No deals in this stage
                </div>
              ) : (
                stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => onSelectStartup(deal)}
                    className="group glass-panel rounded-xl p-3.5 cursor-pointer border border-pando-border hover:border-emerald-500/50 hover:bg-pando-hover/80 transition-all duration-200 shadow-md relative"
                  >
                    {/* Top Info */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={deal.logo}
                          alt={deal.name}
                          className="h-8 w-8 rounded-lg object-cover border border-pando-border"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                            {deal.name}
                          </h3>
                          <p className="text-[10px] font-mono text-pando-muted">{deal.sector}</p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-mono font-bold border shrink-0",
                          deal.thesisMatch.score >= 90
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        )}
                      >
                        {deal.thesisMatch.score}%
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-pando-muted line-clamp-2 mb-3">
                      {deal.tagline}
                    </p>

                    {/* Metrics Row */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-pando-muted pt-2 border-t border-pando-border/50">
                      <div className="flex items-center gap-1 text-white font-medium">
                        <MapPin className="h-3 w-3 text-pando-muted" />
                        <span className="truncate max-w-[100px]">{deal.location}</span>
                      </div>

                      {deal.githubStars ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-bold">
                          <Github className="h-3 w-3" />
                          <span>{deal.githubStars}</span>
                        </div>
                      ) : (
                        <span className="text-pando-muted">{deal.fundingTarget || deal.employees}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
