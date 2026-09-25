"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import {
  ExternalLink,
  Github,
  Star,
  Users,
  TrendingUp,
  Award,
  Network,
  Share2,
  Mail,
  FileText,
  ShieldAlert,
  CheckCircle,
  Eye,
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
      <div className="p-12 text-center rounded-2xl bg-[#0e1422]/60 border border-white/5 space-y-3 font-mono">
        <p className="text-neutral-400 text-sm">No se encontraron startups que coincidan con estos filtros.</p>
        <p className="text-neutral-500 text-xs">Intenta ajustar los criterios de búsqueda o relajar el umbral de Match Score.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-[#0b0f17]/90 border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#0e1422]/90 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold">Compañía & Dominio</th>
              <th className="py-3.5 px-4 font-bold hidden md:table-cell">Descripción</th>
              <th className="py-3.5 px-4 font-bold">Equipo Fundador</th>
              <th className="py-3.5 px-4 font-bold">Señales de Crecimiento (7d)</th>
              <th className="py-3.5 px-4 font-bold text-center">Etapa</th>
              <th className="py-3.5 px-4 font-bold text-center">Thesis Fit</th>
              <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {startups.map((startup) => {
              const score = startup.evaluation.matchScore;
              const isHigh = score >= 85;
              const isDisqualified = !startup.evaluation.passedHardFilters;

              return (
                <tr
                  key={startup.id}
                  onClick={() => onSelectStartup(startup)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group text-xs font-mono"
                >
                  {/* Company Column */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-violet-500/10 border border-white/10 flex items-center justify-center font-bold text-white shrink-0 group-hover:border-emerald-500/40 transition-colors shadow-sm">
                        {startup.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                            {startup.name}
                          </span>
                          {startup.stealthStatus && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                              STEALTH
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {startup.countryCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                          <span>{startup.domain}</span>
                          {startup.githubOrgUrl && (
                            <a
                              href={startup.githubOrgUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-neutral-500 hover:text-white transition-colors"
                            >
                              <Github className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Description Column */}
                  <td className="py-4 px-4 align-top hidden md:table-cell max-w-xs">
                    <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed">
                      {startup.oneLiner}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-neutral-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                      {startup.primaryVertical}
                    </span>
                  </td>

                  {/* Founders & Pedigree Column */}
                  <td className="py-4 px-4 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        {startup.founders.map((f, i) => (
                          <div
                            key={f.id}
                            title={`${f.fullName} (${f.role}) - ${f.exCompanies.join(", ")}`}
                            className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-400/30 flex items-center justify-center text-[10px] font-bold text-violet-200"
                          >
                            {f.fullName.charAt(0)}
                          </div>
                        ))}
                        <span className="text-neutral-300 text-xs font-semibold truncate max-w-[120px]">
                          {startup.founders[0]?.fullName}
                        </span>
                      </div>

                      {/* Ex-companies pills */}
                      <div className="flex flex-wrap items-center gap-1">
                        {startup.founderPedigree.slice(0, 2).map((ped, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20"
                          >
                            {ped}
                          </span>
                        ))}

                        {/* Team Overlap Tag */}
                        {startup.founders.some(
                          (f) => f.teamOverlapMatrix && f.teamOverlapMatrix.length > 0
                        ) && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-bold">
                            <Network className="w-2.5 h-2.5" />
                            <span>Co-Workers</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Growth Signals Column */}
                  <td className="py-4 px-4 align-top">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs shadow-sm">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>+{startup.githubStars7d} ⭐</span>
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {startup.commitVelocity}
                        </span>
                      </div>

                      {/* Mini SVG Sparkline */}
                      {startup.timeSeries?.githubStars && (
                        <div className="flex items-center gap-2 pt-0.5">
                          <svg className="w-20 h-5 overflow-visible" viewBox="0 0 70 20">
                            {(() => {
                              const pts = startup.timeSeries.githubStars;
                              const minV = Math.min(...pts.map((p) => p.value));
                              const maxV = Math.max(...pts.map((p) => p.value));
                              const range = maxV - minV || 1;
                              const coords = pts
                                .map(
                                  (p, idx) =>
                                    `${(idx / (pts.length - 1 || 1)) * 70},${
                                      18 - ((p.value - minV) / range) * 16
                                    }`
                                )
                                .join(" ");
                              return (
                                <>
                                  <polyline
                                    points={coords}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <circle
                                    cx="70"
                                    cy={
                                      18 -
                                      ((pts[pts.length - 1].value - minV) / range) * 16
                                    }
                                    r="2.5"
                                    fill="#34d399"
                                    className="animate-ping"
                                  />
                                  <circle
                                    cx="70"
                                    cy={
                                      18 -
                                      ((pts[pts.length - 1].value - minV) / range) * 16
                                    }
                                    r="2"
                                    fill="#34d399"
                                  />
                                </>
                              );
                            })()}
                          </svg>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">
                            30D VELOCITY
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Stage Column */}
                  <td className="py-4 px-4 align-top text-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-white/[0.04] text-neutral-300 border border-white/10 text-[11px] font-bold">
                      {startup.estimatedStage}
                    </span>
                  </td>

                  {/* Thesis Fit Column */}
                  <td className="py-4 px-4 align-top text-center">
                    {isDisqualified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-xs">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>0% Excluido</span>
                      </span>
                    ) : (
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`px-3 py-1 rounded-xl font-bold text-xs border ${
                            isHigh
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 glow-emerald"
                              : "bg-amber-500/15 text-amber-300 border-amber-500/30 glow-amber"
                          }`}
                        >
                          {score}% FIT
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectStartup(startup)}
                        title="Ver Dossier Completo"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSyncCRM(startup)}
                        title="Sincronizar a Attio CRM"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-emerald-400 border border-white/5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenOutreach(startup)}
                        title="Generar Outreach Email"
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenMemo(startup)}
                        title="Investment Memo IC"
                        className="p-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
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
