"use client";

import React, { useState } from "react";
import { StartupEntity } from "@/types/domain";
import {
  X,
  ExternalLink,
  Github,
  Linkedin,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Share2,
  Mail,
  FileText,
  Radio,
  CheckCircle,
  Network,
  Clock,
  Sparkles,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface HarmonicDossierModalProps {
  startup: StartupEntity | null;
  onClose: () => void;
  onApproveOutreach: (startup: StartupEntity) => void;
  onSyncCRM: (startup: StartupEntity) => void;
  onGenerateMemo: (startup: StartupEntity) => void;
  onRejectFeedback: (startup: StartupEntity, reason: string) => void;
}

export function HarmonicDossierModal({
  startup,
  onClose,
  onApproveOutreach,
  onSyncCRM,
  onGenerateMemo,
  onRejectFeedback,
}: HarmonicDossierModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "signals" | "team" | "metrics">("overview");
  const [selectedMetric, setSelectedMetric] = useState<"stars" | "headcount" | "traffic">("stars");

  if (!startup) return null;

  const score = startup.evaluation.matchScore;
  const isHigh = score >= 85;

  // Format time series data for charts
  const chartData = startup.timeSeries
    ? selectedMetric === "stars"
      ? startup.timeSeries.githubStars.map((p) => ({
          date: p.day,
          value: p.value,
        }))
      : selectedMetric === "headcount"
      ? startup.timeSeries.linkedinHeadcount.map((p) => ({
          date: p.day,
          value: p.value,
        }))
      : startup.timeSeries.webTraffic.map((p) => ({
          date: p.day,
          value: p.value,
        }))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0b0f17] border border-white/[0.12] shadow-2xl overflow-hidden font-mono">
        {/* Modal Top Header (Harmonic Profile Header) */}
        <div className="p-6 border-b border-white/[0.08] bg-[#0e1422] flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center font-bold text-white text-xl shadow-lg">
              {startup.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {startup.name}
                </h2>
                {startup.stealthStatus && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                    STEALTH
                  </span>
                )}
                <span className="text-xs text-neutral-400 font-mono">
                  {startup.countryCode} • {startup.estimatedStage}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <a
                  href={`https://${startup.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>{startup.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {startup.githubOrgUrl && (
                  <a
                    href={startup.githubOrgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                )}
                <span className="text-emerald-400 font-semibold">
                  {startup.primaryVertical}
                </span>
              </div>
            </div>
          </div>

          {/* Close & Score Badge */}
          <div className="flex items-center gap-3">
            <div
              className={`px-3.5 py-1.5 rounded-2xl font-bold text-sm border flex items-center gap-1.5 ${
                isHigh
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 glow-emerald"
                  : "bg-amber-500/15 text-amber-300 border-amber-500/30"
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{score}% THESIS FIT</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Harmonic Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/[0.08] bg-[#0c101a] text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-3 border-b-2 font-bold transition-all ${
              activeTab === "overview"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Overview & Thesis Fit
          </button>
          <button
            onClick={() => setActiveTab("signals")}
            className={`pb-3 px-3 border-b-2 font-bold transition-all ${
              activeTab === "signals"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Signals & Milestones ({startup.signals.length})
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`pb-3 px-3 border-b-2 font-bold transition-all ${
              activeTab === "team"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Founders & Pedigree ({startup.founders.length})
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`pb-3 px-3 border-b-2 font-bold transition-all ${
              activeTab === "metrics"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Growth Trajectory (Series)
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <span className="text-xs uppercase text-neutral-400 font-bold">
                  Resumen Ejecutivo (AI Synthesis):
                </span>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {startup.fullDescription}
                </p>
              </div>

              {/* 3 Investment Highlights */}
              <div className="space-y-2">
                <span className="text-xs uppercase text-emerald-400 font-bold">
                  Puntos Clave de Inversión (Investment Committee):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {startup.evaluation.summaryBullets.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#0e1422] border border-white/5 text-xs text-neutral-300 space-y-1"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Pilar {i + 1}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{hl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" /> Fortalezas (Pros)
                  </span>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                    {startup.evaluation.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Riesgos & Banderas Rojas
                  </span>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                    {startup.evaluation.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIGNALS & MILESTONES */}
          {activeTab === "signals" && (
            <div className="space-y-4">
              <span className="text-xs uppercase text-neutral-400 font-bold">
                Línea de Tiempo de Hitos Detectados:
              </span>
              <div className="space-y-3">
                {startup.signals.map((sig, i) => (
                  <div
                    key={sig.id || i}
                    className="p-4 rounded-xl bg-[#0e1422] border border-white/5 flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">
                          {sig.signalType.replace(/_/g, " ").toUpperCase()}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {new Date(sig.detectedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300">
                        Fuente: <strong className="text-white">{sig.source}</strong> • Confianza:{" "}
                        <strong className="text-emerald-400">{Math.round(sig.confidenceScore * 100)}%</strong>
                      </p>
                      <pre className="p-2 rounded bg-black/40 text-[10px] text-neutral-400 overflow-x-auto">
                        {JSON.stringify(sig.extractedMetrics, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOUNDERS & TEAM OVERLAP */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <span className="text-xs uppercase text-neutral-400 font-bold">
                Equipo Fundador y Matriz de Relación Previa:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {startup.founders.map((founder) => (
                  <div
                    key={founder.id}
                    className="p-4 rounded-xl bg-[#0e1422] border border-white/5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-400/40 flex items-center justify-center font-bold text-violet-200">
                        {founder.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{founder.fullName}</h4>
                        <span className="text-xs text-neutral-400">{founder.role}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-neutral-500">Ex-Empresas: </span>
                        <span className="text-neutral-200 font-semibold">{founder.exCompanies.join(", ")}</span>
                      </div>
                      {founder.academicBackground && founder.academicBackground.length > 0 && (
                        <div>
                          <span className="text-neutral-500">Educación: </span>
                          <span className="text-neutral-200">
                            {founder.academicBackground.map((a) => `${a.degree} (${a.institution})`).join(", ")}
                          </span>
                        </div>
                      )}
                      {founder.previousExits && founder.previousExits.length > 0 && (
                        <div>
                          <span className="text-emerald-400 font-bold">Exits Anteriores: </span>
                          <span className="text-neutral-200">
                            {founder.previousExits.map((e) => `${e.company} → ${e.acquiredBy} (${e.year})`).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {founder.teamOverlapMatrix && founder.teamOverlapMatrix.length > 0 && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <Network className="w-3 h-3" /> Co-Workers en Empresa Previa:
                        </span>
                        {founder.teamOverlapMatrix.map((ov, idx) => (
                          <div key={idx} className="text-[11px] text-neutral-300 mt-0.5">
                            • {ov.previousCompany} con {ov.coFounderName} ({ov.yearsOverlapped} años)
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GROWTH TRAJECTORY METRICS */}
          {activeTab === "metrics" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase text-neutral-400 font-bold">
                  Series Temporales de Crecimiento (Crustdata / Harmonic Engine):
                </span>

                {/* Metric Selector Pills */}
                <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setSelectedMetric("stars")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedMetric === "stars" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    GitHub Stars
                  </button>
                  <button
                    onClick={() => setSelectedMetric("headcount")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedMetric === "headcount" ? "bg-cyan-500/20 text-cyan-300 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Headcount (LinkedIn)
                  </button>
                  <button
                    onClick={() => setSelectedMetric("traffic")}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedMetric === "traffic" ? "bg-violet-500/20 text-violet-300 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Web Traffic
                  </button>
                </div>
              </div>

              {/* Interactive Area Chart */}
              <div className="h-64 w-full p-4 rounded-2xl bg-[#0e1422] border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b0f17",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontFamily: "monospace",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#metricGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar (Harmonic Quick Workflow) */}
        <div className="p-4 px-6 border-t border-white/[0.08] bg-[#0e1422] flex flex-wrap items-center justify-between gap-3">
          {/* Rejection / False Positive Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRejectFeedback(startup, "Market too small")}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-rose-500/10 hover:text-rose-400 text-neutral-400 text-xs border border-white/5 transition-colors"
            >
              Descartar (Mercado Chico)
            </button>
            <button
              onClick={() => onRejectFeedback(startup, "Too early")}
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-amber-500/10 hover:text-amber-400 text-neutral-400 text-xs border border-white/5 transition-colors"
            >
              Demasiado Temprano
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onSyncCRM(startup)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 text-xs border border-white/10 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Sincronizar Attio</span>
            </button>

            <button
              onClick={() => onGenerateMemo(startup)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 text-xs border border-violet-500/30 transition-colors font-bold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Memo IC</span>
            </button>

            <button
              onClick={() => onApproveOutreach(startup)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Mail className="w-3.5 h-3.5 text-black" />
              <span>Aprobar & Generar Outreach</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
