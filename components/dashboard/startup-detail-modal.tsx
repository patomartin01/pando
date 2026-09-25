"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import {
  X,
  ExternalLink,
  Github,
  Check,
  AlertTriangle,
  Sparkles,
  Send,
  FileText,
  Share2,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StartupDetailModalProps {
  startup: StartupEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOutreach: (startup: StartupEntity) => void;
  onOpenMemo: (startup: StartupEntity) => void;
  onSyncCRM: (startup: StartupEntity) => void;
}

const mockTrajectoryData = [
  { day: "Day 1", stars: 120, commits: 14 },
  { day: "Day 5", stars: 210, commits: 28 },
  { day: "Day 10", stars: 390, commits: 45 },
  { day: "Day 15", stars: 620, commits: 70 },
  { day: "Day 20", stars: 840, commits: 110 },
  { day: "Day 25", stars: 1150, commits: 145 },
  { day: "Day 30", stars: 1350, commits: 180 },
];

export function StartupDetailModal({
  startup,
  isOpen,
  onClose,
  onOpenOutreach,
  onOpenMemo,
  onSyncCRM,
}: StartupDetailModalProps) {
  if (!isOpen || !startup) return null;

  const score = startup.evaluation.matchScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl animate-in zoom-in-95 duration-150 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-xl font-bold font-mono text-white shadow-glow">
              {startup.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {startup.name}
                </h2>
                <a
                  href={startup.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {startup.domain} <ExternalLink className="w-3 h-3" />
                </a>
                {startup.githubOrgUrl && (
                  <a
                    href={startup.githubOrgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                {startup.fullDescription || startup.oneLiner}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                Match Score
              </span>
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {score}%
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 30-Day Velocity Chart */}
        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-white uppercase">
                Aceleración de Código & Estrellas (30 Días)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Estrellas GitHub
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Commits / PRs
              </span>
            </div>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrajectoryData}>
                <defs>
                  <linearGradient id="starsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="commitsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#52525b" fontSize={10} />
                <YAxis stroke="#52525b" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#12141a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="stars"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#starsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="commits"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#commitsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3 Summary Bullets (Exact Structure) */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Diagnóstico Agéntico (3 Puntos Clave)
          </h4>
          <div className="space-y-2">
            {startup.evaluation.summaryBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-200"
              >
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Founders Pedigree Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-400" />
            <h4 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Equipo Fundador & Pedigree
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {startup.founders.map((founder) => (
              <div
                key={founder.id}
                className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white">
                    {founder.fullName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {founder.role}
                  </span>
                </div>

                <div className="text-xs text-neutral-400 space-y-1">
                  <div>
                    <span className="text-neutral-500 font-mono">Ex-empresas: </span>
                    <span className="text-neutral-200">
                      {founder.exCompanies.join(", ") || "Frontier Builder"}
                    </span>
                  </div>
                  {founder.academicBackground && (
                    <div>
                      <span className="text-neutral-500 font-mono">Academia: </span>
                      <span className="text-neutral-200">
                        {founder.academicBackground
                          .map((a) => `${a.degree} (${a.institution})`)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags / Dealbreakers */}
        {startup.evaluation.dealbreakers && startup.evaluation.dealbreakers.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
              <AlertTriangle className="w-4 h-4" /> BANDERAS ROJAS / DEALBREAKERS DETECTADOS
            </div>
            <ul className="list-disc list-inside text-xs text-rose-300/90 space-y-1">
              {startup.evaluation.dealbreakers.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="text-xs font-mono text-neutral-500">
            Stage: {startup.estimatedStage} | Vertical: {startup.primaryVertical}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenOutreach(startup)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all glow-emerald"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Generar Outreach</span>
            </button>

            <button
              onClick={() => onOpenMemo(startup)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 transition-all glow-violet"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Investment Memo</span>
            </button>

            <button
              onClick={() => onSyncCRM(startup)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Sync a Attio CRM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
