"use client";

import React, { useState } from "react";
import { StartupEntity, DealStage } from "@/types/domain";
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
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Network,
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
  onUpdateStage: (startupId: string, stage: DealStage, reason?: string) => void;
}

export function StartupDetailModal({
  startup,
  isOpen,
  onClose,
  onOpenOutreach,
  onOpenMemo,
  onSyncCRM,
  onUpdateStage,
}: StartupDetailModalProps) {
  const [selectedMetric, setSelectedMetric] = useState<
    "githubStars" | "linkedinHeadcount" | "engineeringHeadcount" | "webTraffic"
  >("githubStars");

  const [showRejectMenu, setShowRejectMenu] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  if (!isOpen || !startup) return null;

  const score = startup.evaluation.matchScore;

  // Time Series Data based on selected metric
  const chartData = startup.timeSeries
    ? startup.timeSeries[selectedMetric]
    : [
        { day: "W-4", value: 120 },
        { day: "W-3", value: 390 },
        { day: "W-2", value: 780 },
        { day: "W-1", value: 1150 },
        { day: "Today", value: 1690 },
      ];

  const handleAction = async (action: "ACCEPTED" | "REJECTED" | "FALSE_POSITIVE", reason?: string) => {
    try {
      let nextStage: DealStage = startup.pipelineStatus;
      if (action === "ACCEPTED") nextStage = "OUTREACH_PENDING";
      if (action === "REJECTED" || action === "FALSE_POSITIVE") nextStage = "PASSED";

      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: startup.id,
          evaluationId: startup.evaluation.id,
          userAction: action,
          rejectionReason: reason,
          nextStage,
        }),
      });

      onUpdateStage(startup.id, nextStage, reason);
      setShowRejectMenu(false);
      setFeedbackSuccess(`✓ Registrado en bucle RLHF [${action}${reason ? `: ${reason}` : ""}]`);
      setTimeout(() => setFeedbackSuccess(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

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
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {startup.pipelineStatus}
                </span>
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

        {/* Feedback Success Notification */}
        {feedbackSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{feedbackSuccess}</span>
          </div>
        )}

        {/* Quick Action Decision Bar (Crustdata & Harmonic Spec) */}
        <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold">
            Decisión de Inversión (RLHF Active Learning):
          </span>
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => handleAction("ACCEPTED")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all glow-emerald"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Aprobar y Mover a Outreach</span>
            </button>

            <button
              onClick={() => handleAction("FALSE_POSITIVE")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Marcar Falso Positivo</span>
            </button>

            <button
              onClick={() => setShowRejectMenu(!showRejectMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Descartar con Razón ▾</span>
            </button>

            {/* Reject Reason Dropdown */}
            {showRejectMenu && (
              <div className="absolute right-0 top-10 z-20 w-52 glass-panel border border-white/10 rounded-xl p-1 shadow-2xl animate-in fade-in duration-100 font-mono text-xs">
                {[
                  "Too early",
                  "Market too small",
                  "Not technical team",
                  "Out of thesis",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleAction("REJECTED", reason)}
                    className="w-full text-left px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    • {reason}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Crustdata-like Multi-Metric Time Series Chart */}
        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-white uppercase">
                Series Temporales de Crecimiento (Estilo Crustdata)
              </span>
            </div>

            {/* Metric Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: "githubStars", label: "GitHub Stars" },
                { id: "linkedinHeadcount", label: "Headcount" },
                { id: "engineeringHeadcount", label: "Ingeniería" },
                { id: "webTraffic", label: "Web Traffic" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetric(m.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                    selectedMetric === m.id
                      ? "bg-white/15 text-white font-bold border border-white/20"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#metricGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3 Summary Bullets */}
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

        {/* Founders Pedigree & Team Overlap Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400" />
              <h4 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Equipo Fundador & Grafo de Overlap
              </h4>
            </div>
            {startup.founders.some((f) => f.teamOverlapMatrix && f.teamOverlapMatrix.length > 0) && (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                <Network className="w-3.5 h-3.5" />
                <span>Founders Co-Working Overlap Detectado</span>
              </span>
            )}
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

                  {/* Team Overlap Badge */}
                  {founder.teamOverlapMatrix && founder.teamOverlapMatrix.length > 0 && (
                    <div className="mt-1 pt-1 border-t border-white/5">
                      <span className="text-emerald-400 font-mono text-[11px]">
                        ⚡ {founder.teamOverlapMatrix[0].yearsOverlapped} años juntos en {founder.teamOverlapMatrix[0].previousCompany}
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
            Stage: {startup.estimatedStage} | Status: {startup.pipelineStatus}
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
