"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import {
  ExternalLink,
  Github,
  TrendingUp,
  Award,
  Network,
  Share2,
  Mail,
  FileText,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface HarmonicCompanyCardsProps {
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
  onOpenOutreach: (startup: StartupEntity) => void;
  onOpenMemo: (startup: StartupEntity) => void;
  onSyncCRM: (startup: StartupEntity) => void;
}

export function HarmonicCompanyCards({
  startups,
  onSelectStartup,
  onOpenOutreach,
  onOpenMemo,
  onSyncCRM,
}: HarmonicCompanyCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {startups.map((startup) => {
        const score = startup.evaluation.matchScore;
        const isHigh = score >= 85;
        const isDisqualified = !startup.evaluation.passedHardFilters;

        return (
          <div
            key={startup.id}
            onClick={() => onSelectStartup(startup)}
            className="rounded-2xl bg-[#0e1422]/90 hover:bg-[#12192b] border border-white/[0.08] hover:border-emerald-500/40 p-5 space-y-4 transition-all duration-200 cursor-pointer group shadow-xl backdrop-blur-md flex flex-col justify-between"
          >
            {/* Top Card Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center font-bold text-white text-base shadow-sm">
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                        {startup.name}
                      </h3>
                      {startup.stealthStatus && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                          STEALTH
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {startup.domain} • {startup.countryCode}
                    </span>
                  </div>
                </div>

                {/* Score Pill */}
                {isDisqualified ? (
                  <span className="px-2 py-1 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-bold text-xs">
                    0%
                  </span>
                ) : (
                  <span
                    className={`px-2.5 py-1 rounded-xl font-mono font-bold text-xs border ${
                      isHigh
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 glow-emerald"
                        : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {score}% FIT
                  </span>
                )}
              </div>

              {/* One-Liner */}
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {startup.oneLiner}
              </p>

              {/* Signals & Traction Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono font-bold">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  +{startup.githubStars7d} ⭐
                </span>

                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-neutral-300 border border-white/10 text-[11px] font-mono">
                  {startup.commitVelocity}
                </span>

                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-neutral-400 border border-white/5 text-[10px] font-mono">
                  {startup.estimatedStage}
                </span>
              </div>

              {/* Founder Pedigree */}
              <div className="pt-2 border-t border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                  Fundadores & Pedigree:
                </span>
                <div className="flex flex-wrap gap-1">
                  {startup.founderPedigree.map((ped, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20"
                    >
                      {ped}
                    </span>
                  ))}
                  {startup.founders.some(
                    (f) => f.teamOverlapMatrix && f.teamOverlapMatrix.length > 0
                  ) && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                      <Network className="w-3 h-3" /> Overlap 3.5y
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              className="flex items-center justify-between pt-3 border-t border-white/5 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onSelectStartup(startup)}
                className="text-xs font-mono text-emerald-400 hover:underline font-bold"
              >
                Abrir Dossier →
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onSyncCRM(startup)}
                  title="Attio CRM"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenOutreach(startup)}
                  title="Outreach"
                  className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenMemo(startup)}
                  title="Investment Memo"
                  className="p-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
