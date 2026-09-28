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
  ChevronRight,
  Database,
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
            className="rounded-2xl bg-[#10121a] hover:bg-[#141722] border border-white/[0.08] hover:border-white/[0.18] p-5 space-y-4 transition-all duration-200 cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            {/* Top Card Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5f42ff]/20 to-[#2491ff]/20 border border-white/10 flex items-center justify-center font-bold text-white text-base shadow-sm">
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-white group-hover:text-[#a594fd] transition-colors">
                        {startup.name}
                      </h3>
                      {startup.stealthStatus && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-[#2491ff]/15 text-[#60a5fa] border border-[#2491ff]/30 font-semibold">
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
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-bold text-xs">
                    0%
                  </span>
                ) : (
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs border ${
                      isHigh
                        ? "bg-[#5f42ff]/15 text-[#c4b5fd] border-[#5f42ff]/30"
                        : "bg-amber-500/10 text-amber-300 border-amber-500/25"
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
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono font-bold">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  +{startup.githubStars7d} ⭐
                </span>

                <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.08] text-[11px] font-mono">
                  {startup.commitVelocity}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.08] text-[11px]">
                  {startup.estimatedStage}
                </span>
              </div>

              {/* Founder Pedigree */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#5f42ff]/20 text-white text-[10px] font-bold flex items-center justify-center">
                    {startup.founders[0]?.fullName.slice(0, 1)}
                  </div>
                  <span className="text-neutral-300 font-medium truncate max-w-[140px]">
                    {startup.founders[0]?.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#c4b5fd] font-medium">
                  {startup.founders[0]?.exCompanies.slice(0, 1).map((c, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded bg-[#5f42ff]/10 border border-[#5f42ff]/20">
                      ex-{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              className="flex items-center justify-between pt-3 border-t border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onOpenOutreach(startup)}
                  title="Draft Outreach Email"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#5f42ff] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenMemo(startup)}
                  title="IC Memo"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSyncCRM(startup)}
                  title="Sync to Attio CRM"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-emerald-600 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onSelectStartup(startup)}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
