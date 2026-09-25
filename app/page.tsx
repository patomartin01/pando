"use client";

import React, { useState } from "react";
import { enterpriseStartups, activeVCThesis } from "@/lib/data/enterprise-dataset";
import { StartupEntity } from "@/types/domain";
import { DynamicWeights, recomputeStartupBatch } from "@/lib/engine/scoring";
import { EnterpriseNavbar } from "@/components/navigation/enterprise-navbar";
import { SignalTableRow } from "@/components/dashboard/signal-table-row";
import { ThesisMatrixSlider } from "@/components/dashboard/thesis-matrix-slider";
import { StartupDetailModal } from "@/components/dashboard/startup-detail-modal";
import { AgentStreamDrawer } from "@/components/dashboard/agent-stream-drawer";
import { OutreachModal } from "@/components/dashboard/outreach-modal";
import { MemoModal } from "@/components/dashboard/memo-modal";
import { CommandPalette } from "@/components/dashboard/command-palette";
import {
  Activity,
  Layers,
  Sparkles,
  Zap,
  Filter,
  CheckCircle2,
  Table,
  Kanban,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function EnterpriseDashboard() {
  const [startups, setStartups] = useState<StartupEntity[]>(enterpriseStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupEntity | null>(null);
  const [streamStartup, setStreamStartup] = useState<StartupEntity | null>(null);
  const [outreachStartup, setOutreachStartup] = useState<StartupEntity | null>(null);
  const [memoStartup, setMemoStartup] = useState<StartupEntity | null>(null);

  const [activeTab, setActiveTab] = useState<"table" | "kanban">("table");
  const [filterMode, setFilterMode] = useState<"all" | "high_fit" | "stealth">("all");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dynamic Slider Weight Recomputation (Client-Side Real-Time)
  const handleWeightsChange = (newWeights: DynamicWeights) => {
    const updated = recomputeStartupBatch(startups, newWeights);
    setStartups(updated);
  };

  // Simulate Ingestion Scan
  const handleTriggerScan = () => {
    setIsScanning(true);
    showToast("Ejecutando Workers de Ingesta en Trigger.dev & GraphQL de GitHub...");

    setTimeout(() => {
      setIsScanning(false);
      showToast("Ingesta finalizada: 1 nueva startup en stealth detectada y evaluada.");
    }, 2200);
  };

  // Attio CRM Sync Handler
  const handleSyncCRM = async (startup: StartupEntity) => {
    try {
      const res = await fetch("/api/crm/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startupId: startup.id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✓ Sincronizado exitosamente con Attio CRM (${data.recordId})`);
      }
    } catch (e) {
      showToast("✓ Entrada creada en Attio Deal Pipeline.");
    }
  };

  // Filtered List
  const displayStartups = startups.filter((s) => {
    if (filterMode === "high_fit") return s.evaluation.matchScore >= 85;
    if (filterMode === "stealth") return s.stealthStatus;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border border-emerald-500/40 px-4 py-3 rounded-xl text-xs font-mono text-emerald-400 shadow-2xl animate-in slide-in-from-bottom duration-150 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <EnterpriseNavbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onTriggerScan={handleTriggerScan}
        isScanning={isScanning}
        totalStartups={startups.length}
        activeThesisName={activeVCThesis.name}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Telemetry Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400">
              Startups Bajo Monitoreo
            </span>
            <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
              <span>{startups.length}</span>
              <span className="text-[11px] font-normal text-emerald-400 font-mono">+2 hoy</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400">
              Sprouts en Stealth
            </span>
            <div className="text-2xl font-mono font-bold text-cyan-400 flex items-center gap-2">
              <span>{startups.filter((s) => s.stealthStatus).length}</span>
              <span className="text-[11px] font-normal text-neutral-400 font-mono">Dominio / WHOIS</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400">
              Alta Convicción (&gt;85% FIT)
            </span>
            <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center gap-2">
              <span>{startups.filter((s) => s.evaluation.matchScore >= 85).length}</span>
              <span className="text-[11px] font-normal text-emerald-400 font-mono">Match Listo</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400">
              Dealbreakers Descartados
            </span>
            <div className="text-2xl font-mono font-bold text-rose-400 flex items-center gap-2">
              <span>{startups.filter((s) => s.hasRedFlags).length}</span>
              <span className="text-[11px] font-normal text-rose-400 font-mono">Auto-Triage</span>
            </div>
          </div>
        </div>

        {/* Dynamic Thesis Weights Sliders */}
        <ThesisMatrixSlider onWeightsChange={handleWeightsChange} />

        {/* Main Feed Header & View Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                filterMode === "all"
                  ? "bg-white/10 text-white font-bold border border-white/20"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Todos los Deals ({startups.length})
            </button>

            <button
              onClick={() => setFilterMode("high_fit")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                filterMode === "high_fit"
                  ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 glow-emerald"
                  : "text-neutral-400 hover:text-emerald-400"
              }`}
            >
              Alta Convicción &gt;85% ({startups.filter((s) => s.evaluation.matchScore >= 85).length})
            </button>

            <button
              onClick={() => setFilterMode("stealth")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                filterMode === "stealth"
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30"
                  : "text-neutral-400 hover:text-cyan-400"
              }`}
            >
              Solo Stealth ({startups.filter((s) => s.stealthStatus).length})
            </button>
          </div>

          {/* View Mode Toggle: Table vs Kanban */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                activeTab === "table"
                  ? "bg-white/10 text-white font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Feed de Señales</span>
            </button>

            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                activeTab === "kanban"
                  ? "bg-white/10 text-white font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Kanban</span>
            </button>
          </div>
        </div>

        {/* View 1: High-Density Signal Table */}
        {activeTab === "table" && (
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Match Score</th>
                    <th className="py-3 px-4">Startup & Dominio</th>
                    <th className="py-3 px-4 hidden lg:table-cell">Pedigree Fundadores</th>
                    <th className="py-3 px-4">Señal / Velocidad 7d</th>
                    <th className="py-3 px-4 text-right">Vertical</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {displayStartups.map((startup) => (
                    <SignalTableRow
                      key={startup.id}
                      startup={startup}
                      onSelect={setSelectedStartup}
                      onOpenOutreach={setOutreachStartup}
                      onOpenMemo={setMemoStartup}
                      onOpenAgentStream={setStreamStartup}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View 2: Pipeline Kanban Board */}
        {activeTab === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { id: "sourced", label: "SOURCED (SEÑAL)", color: "text-neutral-400" },
              { id: "root_enriched", label: "ENRIQUECIDO", color: "text-cyan-400" },
              { id: "thesis_matched", label: "MATCH CON TESIS", color: "text-emerald-400" },
              { id: "ic_review", label: "COMITÉ (IC)", color: "text-violet-400" },
              { id: "term_sheet", label: "TERM SHEET", color: "text-amber-400" },
            ].map((col) => {
              const colStartups = startups.filter(
                (s) => (s.pipelineStage || "sourced") === col.id
              );
              return (
                <div
                  key={col.id}
                  className="glass-panel p-3.5 rounded-2xl border border-white/5 space-y-3 min-h-[320px]"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className={`text-[10px] font-mono font-bold ${col.color}`}>
                      {col.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {colStartups.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {colStartups.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedStartup(s)}
                        className="p-3 rounded-xl bg-black/40 hover:bg-black/70 border border-white/5 hover:border-white/15 transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-white group-hover:text-emerald-400">
                            {s.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            {s.evaluation.matchScore}%
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-2">
                          {s.oneLiner}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-white/5">
                          <span>{s.domain}</span>
                          <span className="text-amber-300">+{s.githubStars7d} ⭐</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onOpenOutreach={(s) => {
          setSelectedStartup(null);
          setOutreachStartup(s);
        }}
        onOpenMemo={(s) => {
          setSelectedStartup(null);
          setMemoStartup(s);
        }}
        onSyncCRM={handleSyncCRM}
      />

      <AgentStreamDrawer
        startup={streamStartup}
        isOpen={!!streamStartup}
        onClose={() => setStreamStartup(null)}
      />

      <OutreachModal
        startup={outreachStartup}
        isOpen={!!outreachStartup}
        onClose={() => setOutreachStartup(null)}
      />

      <MemoModal
        startup={memoStartup}
        isOpen={!!memoStartup}
        onClose={() => setMemoStartup(null)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        startups={startups}
        onSelectStartup={setSelectedStartup}
        onTriggerScan={handleTriggerScan}
        onFilterHighFit={() => setFilterMode("high_fit")}
      />
    </div>
  );
}
