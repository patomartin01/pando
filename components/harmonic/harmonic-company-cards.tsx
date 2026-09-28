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
            className="rounded-2xl bg-white hover:border-[#abadb3] border border-[#e4e5eb] p-5 space-y-4 transition-all duration-200 cursor-pointer group shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            {/* Top Card Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f0f1f5] border border-[#e4e5eb] flex items-center justify-center font-bold text-[#040508] text-base shadow-2xs group-hover:border-[#5f42ff] transition-colors">
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-[#040508] group-hover:text-[#5f42ff] transition-colors">
                        {startup.name}
                      </h3>
                      {startup.stealthStatus && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#edf6ff] text-[#2491ff] border border-[#2491ff]/30 font-semibold">
                          STEALTH
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#6f727a]">
                      {startup.domain} • {startup.countryCode}
                    </span>
                  </div>
                </div>

                {/* Score Pill */}
                {isDisqualified ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fef0ed] text-[#fe5d45] border border-[#fe5d45]/30 font-mono font-bold text-xs">
                    0%
                  </span>
                ) : (
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs border ${
                      isHigh
                        ? "bg-[#f1edff] text-[#5f42ff] border-[#5f42ff]/30"
                        : "bg-[#fffbeb] text-[#d97706] border-[#f59e0b]/30"
                    }`}
                  >
                    {score}% FIT
                  </span>
                )}
              </div>

              {/* One-Liner */}
              <p className="text-xs text-[#494b52] line-clamp-2 leading-relaxed">
                {startup.oneLiner}
              </p>

              {/* Signals & Traction Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eafbe9] text-[#15803d] border border-[#38cc38]/25 text-[11px] font-mono font-bold">
                  <TrendingUp className="w-3 h-3 text-[#16a34a]" />
                  +{startup.githubStars7d} ⭐
                </span>

                <span className="px-2 py-0.5 rounded-md bg-[#f0f1f5] text-[#494b52] border border-[#e4e5eb] text-[11px] font-mono">
                  {startup.commitVelocity}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-[#f0f1f5] text-[#6f727a] border border-[#e4e5eb] text-[11px]">
                  {startup.estimatedStage}
                </span>
              </div>

              {/* Founder Pedigree */}
              <div className="pt-2 border-t border-[#f0f1f5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#f1edff] text-[#5f42ff] text-[10px] font-bold flex items-center justify-center border border-[#5f42ff]/20">
                    {startup.founders[0]?.fullName.slice(0, 1)}
                  </div>
                  <span className="text-[#040508] font-medium truncate max-w-[140px]">
                    {startup.founders[0]?.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#494b52] font-semibold">
                  {startup.founders[0]?.exCompanies.slice(0, 1).map((c, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded bg-[#f0f1f5] border border-[#d7d9e0]">
                      ex-{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              className="flex items-center justify-between pt-3 border-t border-[#f0f1f5]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onOpenOutreach(startup)}
                  title="Draft Outreach Email"
                  className="p-1.5 rounded-lg bg-[#f0f1f5] hover:bg-[#5f42ff] text-[#494b52] hover:text-white border border-[#e4e5eb] transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenMemo(startup)}
                  title="IC Memo"
                  className="p-1.5 rounded-lg bg-[#f0f1f5] hover:bg-[#040508] text-[#494b52] hover:text-white border border-[#e4e5eb] transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSyncCRM(startup)}
                  title="Sync to Attio CRM"
                  className="p-1.5 rounded-lg bg-[#f0f1f5] hover:bg-[#16a34a] text-[#494b52] hover:text-white border border-[#e4e5eb] transition-colors cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onSelectStartup(startup)}
                className="text-xs font-semibold text-[#6f727a] hover:text-[#040508] flex items-center gap-1 transition-colors cursor-pointer"
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
