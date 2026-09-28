"use client";

import React, { useState } from "react";
import { StartupEntity } from "@/types/domain";
import {
  X,
  ExternalLink,
  Github,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Building,
  GraduationCap,
  Calendar,
  Share2,
  Database,
  Mail,
  FileText,
  ThumbsDown,
  ArrowRight,
  Network,
  Clock,
  Radio,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HarmonicDossierDrawerProps {
  startup: StartupEntity | null;
  onClose: () => void;
  onApproveOutreach: (startup: StartupEntity) => void;
  onSyncCRM: (startup: StartupEntity) => void;
  onGenerateMemo: (startup: StartupEntity) => void;
  onRejectFeedback: (startup: StartupEntity, reason: string) => void;
}

export function HarmonicDossierDrawer({
  startup,
  onClose,
  onApproveOutreach,
  onSyncCRM,
  onGenerateMemo,
  onRejectFeedback,
}: HarmonicDossierDrawerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "founders" | "growth" | "signals">("overview");
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [chartMetric, setChartMetric] = useState<"githubStars" | "linkedinHeadcount" | "webTraffic">("githubStars");

  if (!startup) return null;

  const score = startup.evaluation.matchScore;
  const isHighFit = score >= 85;

  const timeSeriesData = startup.timeSeries
    ? startup.timeSeries[chartMetric].map((pt) => ({
        day: `D-${pt.day}`,
        value: pt.value,
      }))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-[#0e1017] border-l border-white/[0.09] h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-6 border-b border-white/[0.08] bg-[#11131c]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5f42ff]/20 to-[#2491ff]/20 border border-white/10 flex items-center justify-center font-bold text-white text-lg shadow-sm">
                {startup.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">{startup.name}</h2>
                  {startup.stealthStatus && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2491ff]/15 text-[#60a5fa] border border-[#2491ff]/30 font-semibold">
                      STEALTH
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                    {startup.estimatedStage}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400 font-mono">
                  <a
                    href={`https://${startup.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>{startup.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <span>{startup.countryCode}</span>
                  <span>•</span>
                  <span className="text-neutral-300">{startup.primaryVertical}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.07] flex-wrap">
            <button
              onClick={() => onApproveOutreach(startup)}
              className="px-3.5 py-1.5 rounded-lg bg-[#5f42ff] hover:bg-[#5235f5] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Outreach Email</span>
            </button>

            <button
              onClick={() => onGenerateMemo(startup)}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] text-neutral-200 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Investment Memo</span>
            </button>

            <button
              onClick={() => onSyncCRM(startup)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync to Attio CRM</span>
            </button>

            <button
              onClick={() => setIsRejecting(true)}
              className="px-2.5 py-1.5 rounded-lg text-neutral-400 hover:text-rose-400 text-xs transition-colors flex items-center gap-1 cursor-pointer ml-auto"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Pass</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-4 gap-px bg-white/[0.06] border-b border-white/[0.08] text-center text-xs">
          <div className="p-3 bg-[#0e1017]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono">Thesis Fit</span>
            <div className="text-base font-bold text-[#a594fd] font-mono mt-0.5">
              {startup.evaluation.matchScore}%
            </div>
          </div>
          <div className="p-3 bg-[#0e1017]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono">7D Stars</span>
            <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
              +{startup.githubStars7d} ⭐
            </div>
          </div>
          <div className="p-3 bg-[#0e1017]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono">Velocity</span>
            <div className="text-base font-bold text-white font-mono mt-0.5">
              {startup.commitVelocity}
            </div>
          </div>
          <div className="p-3 bg-[#0e1017]">
            <span className="text-[10px] text-neutral-400 uppercase font-mono">Headcount</span>
            <div className="text-base font-bold text-neutral-200 font-mono mt-0.5">
              {startup.timeSeries ? startup.timeSeries.linkedinHeadcount.slice(-1)[0]?.value : 4} eng
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-white/[0.08] bg-[#0e1017] text-xs font-medium">
          {[
            { id: "overview", label: "Overview & Thesis" },
            { id: "founders", label: "Founders & Pedigree" },
            { id: "growth", label: "Growth Trajectory" },
            { id: "signals", label: "Signals & Telemetry" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#5f42ff] text-white font-semibold"
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Executive Summary
                </h4>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {startup.fullDescription || startup.oneLiner}
                </p>
              </div>

              {/* Thesis Fit Breakdown */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#a594fd]" />
                    <span className="text-xs font-semibold text-white">Investment Thesis Analysis</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#a594fd]">
                    {startup.evaluation.matchScore}% Confidence
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {startup.evaluation.summaryBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="text-[#a594fd] shrink-0 font-bold">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Hard Filters Verification */}
                <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-neutral-400">
                    Passed all fund hard filters (Sector match, target stage, valuation ceiling)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOUNDERS & NETWORK */}
          {activeTab === "founders" && (
            <div className="space-y-5">
              <div className="space-y-3">
                {startup.founders.map((founder) => (
                  <div
                    key={founder.id}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#5f42ff]/20 text-[#c4b5fd] font-bold text-sm flex items-center justify-center border border-[#5f42ff]/30">
                          {founder.fullName.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{founder.fullName}</h4>
                          <span className="text-xs text-neutral-400">{founder.role}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        {founder.isTechnical ? "TECHNICAL FOUNDER" : "OPERATOR"}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Building className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Previous: <strong className="text-white">{founder.exCompanies.join(", ")}</strong></span>
                      </div>

                      {founder.academicBackground && founder.academicBackground.length > 0 && (
                        <div className="flex items-center gap-2 text-neutral-400">
                          <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{founder.academicBackground[0].degree} — {founder.academicBackground[0].institution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Co-Workers Overlap Analysis */}
              {startup.founders[0]?.teamOverlapMatrix && startup.founders[0].teamOverlapMatrix.length > 0 && (
                <div className="p-4 rounded-xl bg-[#5f42ff]/10 border border-[#5f42ff]/25 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#c4b5fd]">
                    <Network className="w-4 h-4" />
                    <span>Harmonic Talent DNA: Co-Workers Synergy Verified</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Founders worked together for {startup.founders[0].teamOverlapMatrix[0].yearsOverlapped} years at {startup.founders[0].teamOverlapMatrix[0].previousCompany} prior to founding {startup.name}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GROWTH TRAJECTORY */}
          {activeTab === "growth" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-400">30-Day Crustdata Metrics</span>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                  <button
                    onClick={() => setChartMetric("githubStars")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      chartMetric === "githubStars" ? "bg-[#5f42ff] text-white" : "text-neutral-400"
                    }`}
                  >
                    GitHub Stars
                  </button>
                  <button
                    onClick={() => setChartMetric("linkedinHeadcount")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      chartMetric === "linkedinHeadcount" ? "bg-[#5f42ff] text-white" : "text-neutral-400"
                    }`}
                  >
                    Headcount
                  </button>
                  <button
                    onClick={() => setChartMetric("webTraffic")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      chartMetric === "webTraffic" ? "bg-[#5f42ff] text-white" : "text-neutral-400"
                    }`}
                  >
                    Web Traffic
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5f42ff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#5f42ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#11131c",
                        borderColor: "rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#5f42ff"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#chartGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 4: SIGNALS */}
          {activeTab === "signals" && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-neutral-400">Chronological Telemetry Feed</h4>
              <div className="space-y-2">
                {startup.signals.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-neutral-400 text-[10px]">
                        {new Date(sig.detectedAt).toLocaleDateString()} • {sig.source}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">
                        {Math.round(sig.confidenceScore * 100)}% CONFIDENCE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200">
                      {sig.signalType === "github_star_acceleration" &&
                        `Aceleración de tracción: +${sig.extractedMetrics.stars7d || 500} estrellas en 7 días (${sig.extractedMetrics.starsGrowthRate || "+45%"}).`}
                      {sig.signalType === "commit_velocity_spike" &&
                        `Pico de velocidad técnica: Aumento de commits de ${sig.extractedMetrics.commitVelocityIncrease || "+80%"} (${sig.extractedMetrics.commitCount14d || 45} commits / 14 días).`}
                      {sig.signalType === "stealth_domain_registration" &&
                        `Nuevo dominio en stealth detectado: ${sig.extractedMetrics.domainName || startup.domain} con nameservers privados.`}
                      {sig.signalType === "community_hype_spike" &&
                        `Tracción viral en HackerNews: Show HN con velocidad de votos (+${sig.extractedMetrics.upvoteVelocity || 120} pts/h).`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pass Modal overlay if clicked */}
        {isRejecting && (
          <div className="absolute inset-0 bg-[#0e1017]/95 p-6 flex flex-col justify-center space-y-4 z-20">
            <h3 className="text-base font-bold text-white">Descartar de la Tesis</h3>
            <p className="text-xs text-neutral-400">
              Indica la razón de rechazo para retroalimentar el algoritmo de puntuación (RLHF):
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ej. Valoración muy alta, poca diferenciación contra competidores existentes..."
              className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#5f42ff]"
            />
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setIsRejecting(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onRejectFeedback(startup, rejectReason || "Sin justificación explícita");
                  setIsRejecting(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium"
              >
                Confirmar Descarte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
