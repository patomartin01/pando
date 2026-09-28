"use client";

import React, { useState, useMemo } from "react";
import { enterpriseStartups, activeVCThesis } from "@/lib/data/enterprise-dataset";
import { StartupEntity, DealStage } from "@/types/domain";
import { DynamicWeights, recomputeStartupBatch } from "@/lib/engine/scoring";
import { sendSlackDealAlert } from "@/lib/engine/slack-webhook";

// Harmonic UI Components
import { HarmonicNavbar, HarmonicNavView } from "@/components/harmonic/harmonic-navbar";
import { HarmonicScoutPrompt } from "@/components/harmonic/harmonic-scout-prompt";
import { HarmonicFilterBar } from "@/components/harmonic/harmonic-filter-bar";
import { HarmonicCompanyTable } from "@/components/harmonic/harmonic-company-table";
import { HarmonicCompanyCards } from "@/components/harmonic/harmonic-company-cards";
import { HarmonicSignalsFeed } from "@/components/harmonic/harmonic-signals-feed";
import { HarmonicDossierDrawer } from "@/components/harmonic/harmonic-dossier-drawer";
import { HarmonicRadarVisualizer } from "@/components/harmonic/harmonic-radar-visualizer";
import { HarmonicNetworkGraph } from "@/components/harmonic/harmonic-network-graph";

// Existing Working Engine Modals
import { ThesisMatrixSlider } from "@/components/dashboard/thesis-matrix-slider";
import { OutreachModal } from "@/components/dashboard/outreach-modal";
import { MemoModal } from "@/components/dashboard/memo-modal";
import { CommandPalette } from "@/components/dashboard/command-palette";

import {
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Radio,
  Sliders,
  Compass,
  CheckCircle2,
  Sparkles,
  Target,
  Network,
} from "lucide-react";

const PIPELINE_COLUMNS: { id: DealStage; label: string; color: string }[] = [
  { id: "NEW_SIGNAL", label: "NUEVAS SEÑALES", color: "text-neutral-400" },
  { id: "AI_QUALIFIED", label: "CALIFICADO POR IA", color: "text-blue-400" },
  { id: "SAVED_FOR_REVIEW", label: "EN REVISIÓN", color: "text-amber-400" },
  { id: "OUTREACH_PENDING", label: "OUTREACH PENDIENTE", color: "text-emerald-400" },
  { id: "CONTACTED", label: "CONTACTADO", color: "text-purple-400" },
  { id: "PASSED", label: "DESCARTADO", color: "text-rose-400" },
  { id: "INVESTED", label: "INVERTIDO", color: "text-emerald-300" },
];

export default function HarmonicDashboard() {
  const [startups, setStartups] = useState<StartupEntity[]>(enterpriseStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupEntity | null>(null);
  const [outreachStartup, setOutreachStartup] = useState<StartupEntity | null>(null);
  const [memoStartup, setMemoStartup] = useState<StartupEntity | null>(null);

  // Top Nav View
  const [activeView, setActiveView] = useState<HarmonicNavView>("scout");

  // Scout Sub-View Mode: 'table' | 'cards' | 'kanban'
  const [viewMode, setViewMode] = useState<"table" | "cards" | "kanban">("table");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVertical, setSelectedVertical] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedSignalType, setSelectedSignalType] = useState("all");
  const [minScore, setMinScore] = useState(0);

  // UI state
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Dynamic slider weights recomputation
  const handleWeightsChange = (newWeights: DynamicWeights) => {
    const updated = recomputeStartupBatch(startups, newWeights);
    setStartups(updated);
  };

  // Deal Stage updates
  const handleUpdateStage = (startupId: string, stage: DealStage, reason?: string) => {
    setStartups((prev) =>
      prev.map((s) => (s.id === startupId ? { ...s, pipelineStatus: stage } : s))
    );

    if (stage === "OUTREACH_PENDING") {
      const target = startups.find((s) => s.id === startupId);
      if (target && target.evaluation.matchScore >= 85) {
        sendSlackDealAlert(target);
        showToast(`🚨 Alerta enviada a Slack (#deals-high-conviction) para ${target.name}`);
      }
    }
  };

  // Trigger ingestion scan simulation
  const handleTriggerScan = () => {
    setIsScanning(true);
    showToast("Ejecutando Harmonic Discovery Crawler en GitHub GraphQL y WHOIS feeds...");

    setTimeout(() => {
      setIsScanning(false);
      showToast("Escaneo completado: 14 nuevos eventos de tracción y estrellas indexados.");
    }, 2000);
  };

  // Attio CRM Sync
  const handleSyncCRM = async (startup: StartupEntity) => {
    try {
      const res = await fetch("/api/crm/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startupId: startup.id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✅ ${startup.name} sincronizado exitosamente con Attio CRM Workspace`);
      } else {
        showToast(`ℹ️ ${startup.name} guardado en registro local de Attio`);
      }
    } catch {
      showToast(`ℹ️ ${startup.name} sincronizado con CRM`);
    }
  };

  // RLHF Feedback Rejection
  const handleRejectFeedback = async (startup: StartupEntity, reason: string) => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: startup.id,
          founderIds: startup.founders.map((f) => f.id),
          vertical: startup.primaryVertical,
          reason,
          penaltyScore: 25,
        }),
      });
      handleUpdateStage(startup.id, "PASSED", reason);
      setSelectedStartup(null);
      showToast(`📉 Penalización aplicada a ${startup.name} (-25 pts por RLHF Feedback)`);
    } catch {
      handleUpdateStage(startup.id, "PASSED", reason);
      setSelectedStartup(null);
    }
  };

  // Preset Selection from Scout Prompt
  const handleSelectPreset = (preset: { query?: string; vertical?: string; stage?: string; minScore?: number }) => {
    if (preset.query !== undefined) setSearchQuery(preset.query);
    if (preset.vertical !== undefined) setSelectedVertical(preset.vertical);
    if (preset.stage !== undefined) setSelectedStage(preset.stage);
    if (preset.minScore !== undefined) setMinScore(preset.minScore);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedVertical("all");
    setSelectedStage("all");
    setSelectedSignalType("all");
    setMinScore(0);
  };

  // Multi-Filter Pipeline
  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      // Natural language / text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = startup.name.toLowerCase().includes(q);
        const matchesDesc = (startup.oneLiner + " " + startup.fullDescription).toLowerCase().includes(q);
        const matchesFounders = startup.founders.some(
          (f) =>
            f.fullName.toLowerCase().includes(q) ||
            f.exCompanies.some((c) => c.toLowerCase().includes(q))
        );
        const matchesVertical = startup.primaryVertical.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesFounders && !matchesVertical) return false;
      }

      // Vertical filter
      if (selectedVertical !== "all" && startup.primaryVertical !== selectedVertical) {
        return false;
      }

      // Stage filter
      if (selectedStage === "stealth" && !startup.stealthStatus) {
        return false;
      } else if (selectedStage !== "all" && selectedStage !== "stealth" && startup.estimatedStage !== selectedStage) {
        return false;
      }

      // Signal Type filter
      if (selectedSignalType !== "all") {
        const hasSignal = startup.signals.some((s) => s.signalType === selectedSignalType);
        if (!hasSignal) return false;
      }

      // Minimum Score
      if (minScore > 0 && startup.evaluation.matchScore < minScore) {
        return false;
      }

      return true;
    });
  }, [startups, searchQuery, selectedVertical, selectedStage, selectedSignalType, minScore]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans relative selection:bg-[#5f42ff]/30 selection:text-white">
      {/* Harmonic Subtle Hero Ambient Lighting */}
      <div className="fixed inset-0 harmonic-ambient-glow pointer-events-none z-0" />

      {/* Global Top Navbar */}
      <HarmonicNavbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenCommand={() => setIsCommandOpen(true)}
        onTriggerScan={handleTriggerScan}
        isScanning={isScanning}
        totalCompanies={startups.length}
        stealthCount={startups.filter((s) => s.stealthStatus).length}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#141722] border border-white/10 text-white text-xs shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-[#a594fd]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Workspace View Container */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto px-4 sm:px-6 py-6 z-10 relative">
        {/* VIEW 1: SCOUT (Harmonic Flagship) */}
        {activeView === "scout" && (
          <div className="space-y-5">
            {/* Harmonic Scout AI Prompt Bar */}
            <HarmonicScoutPrompt
              onSearch={setSearchQuery}
              onSelectPreset={handleSelectPreset}
              currentQuery={searchQuery}
              totalCompanies={startups.length}
            />

            {/* Filter Toolbar */}
            <HarmonicFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedVertical={selectedVertical}
              onSelectVertical={setSelectedVertical}
              selectedStage={selectedStage}
              onSelectStage={setSelectedStage}
              selectedSignalType={selectedSignalType}
              onSelectSignalType={setSelectedSignalType}
              minScore={minScore}
              onMinScoreChange={setMinScore}
              displayCount={filteredStartups.length}
              totalCount={startups.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onResetFilters={handleResetFilters}
            />

            {/* Content Mode Switcher: Table or Cards or Pipeline */}
            {viewMode === "table" && (
              <HarmonicCompanyTable
                startups={filteredStartups}
                onSelectStartup={setSelectedStartup}
                onOpenOutreach={setOutreachStartup}
                onOpenMemo={setMemoStartup}
                onSyncCRM={handleSyncCRM}
              />
            )}

            {viewMode === "cards" && (
              <HarmonicCompanyCards
                startups={filteredStartups}
                onSelectStartup={setSelectedStartup}
                onOpenOutreach={setOutreachStartup}
                onOpenMemo={setMemoStartup}
                onSyncCRM={handleSyncCRM}
              />
            )}

            {viewMode === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3.5 overflow-x-auto pb-4">
                {PIPELINE_COLUMNS.map((col) => {
                  const stageStartups = filteredStartups.filter((s) => s.pipelineStatus === col.id);
                  return (
                    <div
                      key={col.id}
                      className="rounded-xl bg-[#10121a] border border-white/[0.08] p-3 flex flex-col min-w-[200px]"
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
                        <span className={`text-[11px] font-bold tracking-wider ${col.color}`}>
                          {col.label}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400">
                          {stageStartups.length}
                        </span>
                      </div>

                      <div className="space-y-2 flex-1">
                        {stageStartups.map((st) => (
                          <div
                            key={st.id}
                            onClick={() => setSelectedStartup(st)}
                            className="p-3 rounded-lg bg-[#141722] hover:bg-[#1a1e2d] border border-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer group space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white group-hover:text-[#a594fd] transition-colors">
                                {st.name}
                              </span>
                              <span className="text-[10px] font-mono text-[#a594fd]">
                                {st.evaluation.matchScore}%
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-1">{st.oneLiner}</p>
                            <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-500">
                              <span>+{st.githubStars7d} ⭐</span>
                              <span>{st.estimatedStage}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: TACTICAL RADAR & TALENT DNA */}
        {activeView === "radar" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HarmonicRadarVisualizer
                startups={filteredStartups}
                onSelectStartup={setSelectedStartup}
              />
              <HarmonicNetworkGraph
                startups={filteredStartups}
                onSelectStartup={setSelectedStartup}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE SIGNALS */}
        {activeView === "signals" && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <HarmonicSignalsFeed
              startups={startups}
              onSelectStartup={setSelectedStartup}
            />
          </div>
        )}

        {/* VIEW 4: THESIS MATRIX */}
        {activeView === "thesis" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-[#10121a] border border-white/[0.08] shadow-xl space-y-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#5f42ff]" />
                <h3 className="text-base font-bold text-white">Investment Thesis Weight Matrix</h3>
              </div>
              <p className="text-xs text-neutral-400">
                Ajusta las ponderaciones del algoritmo multivariante en tiempo real para recomputar el Match Score de todo el portafolio.
              </p>
            </div>
            <ThesisMatrixSlider onWeightsChange={handleWeightsChange} />
          </div>
        )}

        {/* VIEW 5: PIPELINE KANBAN */}
        {activeView === "kanban" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#10121a] border border-white/[0.08]">
              <div>
                <h3 className="text-sm font-bold text-white">Deal Flow Pipeline & CRM Sync</h3>
                <p className="text-xs text-neutral-400">
                  Arrastra o mueve las oportunidades entre estados con sincronización en tiempo real a Attio CRM.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3.5 overflow-x-auto pb-4">
              {PIPELINE_COLUMNS.map((col) => {
                const stageStartups = startups.filter((s) => s.pipelineStatus === col.id);
                return (
                  <div
                    key={col.id}
                    className="rounded-xl bg-[#10121a] border border-white/[0.08] p-3 flex flex-col min-w-[200px]"
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
                      <span className={`text-[11px] font-bold tracking-wider ${col.color}`}>
                        {col.label}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400">
                        {stageStartups.length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1">
                      {stageStartups.map((st) => (
                        <div
                          key={st.id}
                          onClick={() => setSelectedStartup(st)}
                          className="p-3 rounded-lg bg-[#141722] hover:bg-[#1a1e2d] border border-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer group space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white group-hover:text-[#a594fd] transition-colors">
                              {st.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#a594fd]">
                              {st.evaluation.matchScore}%
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1">{st.oneLiner}</p>
                          <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-500">
                            <span>+{st.githubStars7d} ⭐</span>
                            <span>{st.estimatedStage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Harmonic Slide-Over Dossier Drawer */}
      <HarmonicDossierDrawer
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onApproveOutreach={(st) => {
          setSelectedStartup(null);
          setOutreachStartup(st);
        }}
        onSyncCRM={handleSyncCRM}
        onGenerateMemo={(st) => {
          setSelectedStartup(null);
          setMemoStartup(st);
        }}
        onRejectFeedback={handleRejectFeedback}
      />

      {/* IC Memo Modal */}
      <MemoModal
        startup={memoStartup}
        isOpen={!!memoStartup}
        onClose={() => setMemoStartup(null)}
      />

      {/* Outreach Email Modal */}
      <OutreachModal
        startup={outreachStartup}
        isOpen={!!outreachStartup}
        onClose={() => setOutreachStartup(null)}
      />

      {/* Quick Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        startups={startups}
        onSelectStartup={(st) => {
          setIsCommandOpen(false);
          setSelectedStartup(st);
        }}
        onTriggerScan={handleTriggerScan}
        onFilterHighFit={() => {
          setIsCommandOpen(false);
          setMinScore(85);
        }}
      />
    </div>
  );
}
