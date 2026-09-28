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
      <div className="relative w-full max-w-2xl bg-white border-l border-[#e4e5eb] h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-6 border-b border-[#e4e5eb] bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#f0f1f5] border border-[#e4e5eb] flex items-center justify-center font-bold text-[#040508] text-lg shadow-2xs">
                {startup.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#040508] tracking-tight">{startup.name}</h2>
                  {startup.stealthStatus && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#edf6ff] text-[#2491ff] border border-[#2491ff]/30 font-semibold">
                      STEALTH
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f0f1f5] text-[#494b52] border border-[#e4e5eb]">
                    {startup.estimatedStage}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#6f727a] font-mono">
                  <a
                    href={`https://${startup.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#040508] flex items-center gap-1 transition-colors"
                  >
                    <span>{startup.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <span>{startup.countryCode}</span>
                  <span>•</span>
                  <span className="text-[#040508] font-medium">{startup.primaryVertical}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6f727a] hover:text-[#040508] hover:bg-[#f0f1f5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#e4e5eb] flex-wrap">
            <button
              onClick={() => onApproveOutreach(startup)}
              className="px-4 py-2 rounded-full bg-[#5f42ff] hover:bg-[#4d30f0] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Outreach Email</span>
            </button>

            <button
              onClick={() => onGenerateMemo(startup)}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#f5f6fa] text-[#040508] text-xs font-semibold border border-[#e4e5eb] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Investment Memo</span>
            </button>

            <button
              onClick={() => onSyncCRM(startup)}
              className="px-4 py-2 rounded-full bg-[#eafbe9] hover:bg-[#d5f7d3] text-[#15803d] text-xs font-semibold border border-[#38cc38]/30 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync to Attio CRM</span>
            </button>

            <button
              onClick={() => setIsRejecting(true)}
              className="px-3 py-1.5 rounded-full text-[#6f727a] hover:text-[#fe5d45] hover:bg-[#fef0ed] text-xs transition-colors flex items-center gap-1 cursor-pointer ml-auto font-medium"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Pass</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-4 gap-px bg-[#e4e5eb] border-b border-[#e4e5eb] text-center text-xs">
          <div className="p-3 bg-[#f8f9fa]">
            <span className="text-[10px] text-[#6f727a] uppercase font-mono font-semibold">Thesis Fit</span>
            <div className="text-base font-bold text-[#5f42ff] font-mono mt-0.5">
              {startup.evaluation.matchScore}%
            </div>
          </div>
          <div className="p-3 bg-[#f8f9fa]">
            <span className="text-[10px] text-[#6f727a] uppercase font-mono font-semibold">7D Stars</span>
            <div className="text-base font-bold text-[#16a34a] font-mono mt-0.5">
              +{startup.githubStars7d} ⭐
            </div>
          </div>
          <div className="p-3 bg-[#f8f9fa]">
            <span className="text-[10px] text-[#6f727a] uppercase font-mono font-semibold">Velocity</span>
            <div className="text-base font-bold text-[#040508] font-mono mt-0.5">
              {startup.commitVelocity}
            </div>
          </div>
          <div className="p-3 bg-[#f8f9fa]">
            <span className="text-[10px] text-[#6f727a] uppercase font-mono font-semibold">Headcount</span>
            <div className="text-base font-bold text-[#040508] font-mono mt-0.5">
              {startup.timeSeries ? startup.timeSeries.linkedinHeadcount.slice(-1)[0]?.value : 4} eng
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-[#e4e5eb] bg-white text-xs font-semibold">
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
                  ? "border-[#5f42ff] text-[#040508] font-bold"
                  : "border-transparent text-[#6f727a] hover:text-[#040508]"
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
                <h4 className="text-xs font-mono uppercase text-[#6f727a] font-bold tracking-wider">
                  Executive Summary
                </h4>
                <p className="text-sm text-[#212226] leading-relaxed">
                  {startup.fullDescription || startup.oneLiner}
                </p>
              </div>

              {/* Thesis Fit Breakdown */}
              <div className="p-5 rounded-2xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5f42ff]" />
                    <span className="text-xs font-bold text-[#040508]">Investment Thesis Analysis</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#5f42ff]">
                    {startup.evaluation.matchScore}% Confidence
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {startup.evaluation.summaryBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#494b52]">
                      <span className="text-[#5f42ff] shrink-0 font-bold">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Hard Filters Verification */}
                <div className="pt-2 border-t border-[#e4e5eb] flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span className="text-[#6f727a] font-medium">
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
                    className="p-5 rounded-2xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-3 shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f1edff] text-[#5f42ff] font-bold text-sm flex items-center justify-center border border-[#5f42ff]/30 shadow-2xs">
                          {founder.fullName.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#040508]">{founder.fullName}</h4>
                          <span className="text-xs text-[#6f727a]">{founder.role}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#eafbe9] text-[#15803d] border border-[#38cc38]/30 font-semibold">
                        {founder.isTechnical ? "TECHNICAL FOUNDER" : "OPERATOR"}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-[#494b52]">
                        <Building className="w-3.5 h-3.5 text-[#6f727a]" />
                        <span>Previous: <strong className="text-[#040508]">{founder.exCompanies.join(", ")}</strong></span>
                      </div>

                      {founder.academicBackground && founder.academicBackground.length > 0 && (
                        <div className="flex items-center gap-2 text-[#6f727a]">
                          <GraduationCap className="w-3.5 h-3.5 text-[#6f727a]" />
                          <span>{founder.academicBackground[0].degree} — {founder.academicBackground[0].institution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Co-Workers Overlap Analysis */}
              {startup.founders[0]?.teamOverlapMatrix && startup.founders[0].teamOverlapMatrix.length > 0 && (
                <div className="p-4 rounded-xl bg-[#f1edff] border border-[#5f42ff]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5f42ff]">
                    <Network className="w-4 h-4" />
                    <span>Pando Talent DNA: Co-Workers Synergy Verified</span>
                  </div>
                  <p className="text-xs text-[#494b52] leading-relaxed">
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
                <span className="text-xs font-mono uppercase text-[#6f727a] font-bold">30-Day Crustdata Metrics</span>
                <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#f0f1f5] border border-[#e4e5eb] text-[11px] font-semibold">
                  <button
                    onClick={() => setChartMetric("githubStars")}
                    className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      chartMetric === "githubStars" ? "bg-white text-[#040508] shadow-xs" : "text-[#6f727a]"
                    }`}
                  >
                    GitHub Stars
                  </button>
                  <button
                    onClick={() => setChartMetric("linkedinHeadcount")}
                    className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      chartMetric === "linkedinHeadcount" ? "bg-white text-[#040508] shadow-xs" : "text-[#6f727a]"
                    }`}
                  >
                    Headcount
                  </button>
                  <button
                    onClick={() => setChartMetric("webTraffic")}
                    className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      chartMetric === "webTraffic" ? "bg-white text-[#040508] shadow-xs" : "text-[#6f727a]"
                    }`}
                  >
                    Web Traffic
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="p-4 rounded-2xl bg-[#f8f9fc] border border-[#e4e5eb] h-64 shadow-2xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5f42ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#5f42ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#909299" fontSize={10} tickLine={false} />
                    <YAxis stroke="#909299" fontSize={10} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e4e5eb",
                        borderRadius: "12px",
                        fontSize: "12px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
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
              <h4 className="text-xs font-mono uppercase text-[#6f727a] font-bold">Chronological Telemetry Feed</h4>
              <div className="space-y-2">
                {startup.signals.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-4 rounded-2xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#6f727a] text-[10px]">
                        {new Date(sig.detectedAt).toLocaleDateString()} • {sig.source}
                      </span>
                      <span className="font-mono text-[10px] text-[#15803d] font-bold">
                        {Math.round(sig.confidenceScore * 100)}% CONFIDENCE
                      </span>
                    </div>
                    <p className="text-xs text-[#212226]">
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
          <div className="absolute inset-0 bg-white/95 p-6 flex flex-col justify-center space-y-4 z-20">
            <h3 className="text-base font-bold text-[#040508]">Descartar de la Tesis</h3>
            <p className="text-xs text-[#6f727a]">
              Indica la razón de rechazo para retroalimentar el algoritmo de puntuación (RLHF):
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ej. Valoración muy alta, poca diferenciación contra competidores existentes..."
              className="w-full rounded-2xl bg-[#f8f9fc] border border-[#d7d9e0] p-3 text-xs text-[#040508] focus:outline-none focus:border-[#5f42ff]"
            />
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setIsRejecting(false)}
                className="px-3.5 py-1.5 rounded-full text-xs text-[#6f727a] hover:text-[#040508]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onRejectFeedback(startup, rejectReason || "Sin justificación explícita");
                  setIsRejecting(false);
                }}
                className="px-4 py-2 rounded-full bg-[#fe5d45] hover:bg-[#e0452d] text-white text-xs font-bold shadow-xs"
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
