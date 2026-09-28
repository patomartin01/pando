"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import {
  ExternalLink,
  Github,
  Users,
  TrendingUp,
  Award,
  Network,
  Mail,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Database,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface HarmonicCompanyTableProps {
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
  onOpenOutreach: (startup: StartupEntity) => void;
  onOpenMemo: (startup: StartupEntity) => void;
  onSyncCRM: (startup: StartupEntity) => void;
}

export function HarmonicCompanyTable({
  startups,
  onSelectStartup,
  onOpenOutreach,
  onOpenMemo,
  onSyncCRM,
}: HarmonicCompanyTableProps) {
  if (startups.length === 0) {
    return (
      <div className="p-16 text-center rounded-2xl bg-[#10121a] border border-white/[0.08] space-y-3">
        <Sparkles className="w-8 h-8 text-[#5f42ff] mx-auto opacity-60" />
        <h3 className="text-base font-bold text-white">No companies match your filters</h3>
        <p className="text-xs text-neutral-400 max-w-sm mx-auto">
          Try loosening your thesis score threshold or clearing stage and vertical constraints.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-[#10121a] border border-white/[0.08] overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#141722] text-[11px] font-semibold text-neutral-400 tracking-wider">
              <th className="py-3.5 px-4">Company</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Description & Vertical</th>
              <th className="py-3.5 px-4">Founders & Pedigree</th>
              <th className="py-3.5 px-4">Traction & Velocity</th>
              <th className="py-3.5 px-4 text-center">Stage</th>
              <th className="py-3.5 px-4 text-center">Thesis Fit</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {startups.map((startup) => {
              const score = startup.evaluation.matchScore;
              const isHigh = score >= 85;
              const isDisqualified = !startup.evaluation.passedHardFilters;

              // Generate SVG Sparkline Points
              const pts = startup.timeSeries?.githubStars || [];
              const minVal = Math.min(...pts.map((p) => p.value), 0);
              const maxVal = Math.max(...pts.map((p) => p.value), 100);
              const width = 80;
              const height = 24;
              const sparklinePoints = pts
                .map((pt, idx) => {
                  const x = (idx / (pts.length - 1 || 1)) * width;
                  const y = height - ((pt.value - minVal) / (maxVal - minVal || 1)) * (height - 4) - 2;
                  return `${x},${y}`;
                })
                .join(" ");

              return (
                <tr
                  key={startup.id}
                  onClick={() => onSelectStartup(startup)}
                  className="harmonic-row cursor-pointer group text-xs transition-colors"
                >
                  {/* Company Column */}
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5f42ff]/20 to-[#2491ff]/20 border border-white/10 flex items-center justify-center font-bold text-white text-sm shrink-0 group-hover:border-[#5f42ff]/50 transition-colors shadow-sm">
                        {startup.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-[#a594fd] transition-colors">
                            {startup.name}
                          </span>
                          {startup.stealthStatus && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#2491ff]/15 text-[#60a5fa] border border-[#2491ff]/30 font-semibold">
                              STEALTH
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-mono">
                          <span className="hover:text-white transition-colors">{startup.domain}</span>
                          <span>•</span>
                          <span>{startup.countryCode}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Description & Vertical */}
                  <td className="py-4 px-4 align-middle hidden lg:table-cell max-w-xs">
                    <div className="space-y-1.5">
                      <p className="text-neutral-300 text-xs line-clamp-1 leading-snug">
                        {startup.oneLiner}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.08] text-[10px] font-medium">
                        {startup.primaryVertical}
                      </span>
                    </div>
                  </td>

                  {/* Founders & Pedigree */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {startup.founders.map((f, i) => (
                            <div
                              key={f.id}
                              title={`${f.fullName} (${f.role})`}
                              className="w-5 h-5 rounded-full bg-[#5f42ff]/30 border border-white/20 text-[9px] font-bold text-white flex items-center justify-center"
                            >
                              {f.fullName.slice(0, 1)}
                            </div>
                          ))}
                        </div>
                        <span className="font-semibold text-neutral-200 text-xs">
                          {startup.founders[0]?.fullName}
                        </span>
                      </div>

                      {/* Ex-companies chips */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {startup.founders[0]?.exCompanies.slice(0, 2).map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 rounded bg-[#5f42ff]/10 text-[#c4b5fd] border border-[#5f42ff]/20 text-[10px] font-medium"
                          >
                            ex-{comp}
                          </span>
                        ))}
                        {startup.founders[0]?.teamOverlapMatrix && startup.founders[0].teamOverlapMatrix.length > 0 && (
                          <span
                            title="Co-founders worked together at a previous company"
                            className="px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25 text-[10px] flex items-center gap-1 font-medium"
                          >
                            <Network className="w-2.5 h-2.5" />
                            <span>Overlap</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Traction & Velocity Sparkline */}
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-3">
                      {pts.length > 0 && (
                        <div className="w-20 h-6 shrink-0">
                          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
                            <defs>
                              <linearGradient id={`spark-${startup.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <polyline
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={sparklinePoints}
                            />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1 font-bold text-emerald-400 font-mono text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span>+{startup.githubStars7d} ⭐</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {startup.commitVelocity}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Stage */}
                  <td className="py-4 px-4 align-middle text-center">
                    <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-[11px] font-mono">
                      {startup.estimatedStage}
                    </span>
                  </td>

                  {/* Thesis Fit */}
                  <td className="py-4 px-4 align-middle text-center">
                    <div className="inline-flex flex-col items-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-xs ${
                          isHigh
                            ? "bg-[#5f42ff]/15 text-[#a594fd] border border-[#5f42ff]/30"
                            : isDisqualified
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {score}%
                      </span>
                      <div className="w-12 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isHigh ? "bg-[#5f42ff]" : isDisqualified ? "bg-rose-500" : "bg-amber-400"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-4 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenOutreach(startup)}
                        title="Draft Outreach Email"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#5f42ff] text-neutral-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSyncCRM(startup)}
                        title="Sync to Attio CRM"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-emerald-600 text-neutral-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                      >
                        <Database className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectStartup(startup)}
                        title="Open Dossier"
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.12] text-neutral-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
