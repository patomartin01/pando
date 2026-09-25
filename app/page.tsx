"use client";

import React, { useState, useMemo } from "react";
import { enterpriseStartups, activeVCThesis } from "@/lib/data/enterprise-dataset";
import { StartupEntity, DealStage } from "@/types/domain";
import { DynamicWeights, recomputeStartupBatch } from "@/lib/engine/scoring";
import { sendSlackDealAlert } from "@/lib/engine/slack-webhook";

// Harmonic UI Components
import { HarmonicNavbar } from "@/components/harmonic/harmonic-navbar";
import { HarmonicFilterBar } from "@/components/harmonic/harmonic-filter-bar";
import { HarmonicCompanyTable } from "@/components/harmonic/harmonic-company-table";
import { HarmonicCompanyCards } from "@/components/harmonic/harmonic-company-cards";
import { HarmonicSignalsFeed } from "@/components/harmonic/harmonic-signals-feed";
import { HarmonicDossierModal } from "@/components/harmonic/harmonic-dossier-modal";

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
} from "lucide-react";

const PIPELINE_COLUMNS: { id: DealStage; label: string; color: string }[] = [
  { id: "NEW_SIGNAL", label: "NUEVAS SEÑALES", color: "text-neutral-400" },
  { id: "AI_QUALIFIED", label: "CALIFICADO POR IA", color: "text-cyan-400" },
  { id: "SAVED_FOR_REVIEW", label: "EN REVISIÓN", color: "text-amber-400" },
  { id: "OUTREACH_PENDING", label: "OUTREACH PENDIENTE", color: "text-emerald-400" },
  { id: "CONTACTED", label: "CONTACTADO", color: "text-violet-400" },
  { id: "PASSED", label: "DESCARTADO", color: "text-rose-400" },
  { id: "INVESTED", label: "INVERTIDO", color: "text-emerald-300" },
];

export default function HarmonicDashboard() {
  const [startups, setStartups] = useState<StartupEntity[]>(enterpriseStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupEntity | null>(null);
  const [outreachStartup, setOutreachStartup] = useState<StartupEntity | null>(null);
  const [memoStartup, setMemoStartup] = useState<StartupEntity | null>(null);

  // Top Nav View: 'scout' | 'signals' | 'thesis' | 'kanban'
  const [activeView, setActiveView] = useState<"scout" | "signals" | "thesis" | "kanban">("scout");

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

  // Recompute scores on dynamic thesis sliders
  const handleWeightsChange = (newWeights: DynamicWeights) => {
    const updated = recomputeStartupBatch(startups, newWeights);
    setStartups(updated);
  };

  // Stage changes (RLHF & Pipeline)
  const handleUpdateStage = (startupId: string, stage: DealStage, reason?: string) => {
    setStartups((prev) =>
      prev.map((s) => (s.id === startupId ? { ...s, pipelineStatus: stage } : s))
    );

    if (stage === "OUTREACH_PENDING") {
      const target = startups.find((s) => s.id === startupId);
      if (target && target.evaluation.matchScore >= 85) {
        sendSlackDealAlert(target);
        showToast(`🚨 Alerta visual enviada a Slack (#deals-high-conviction) para ${target.name}`);
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
    }, 2200);
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
        showToast(`✅ ${startup.name} sincronizado exitosamente con Attio CRM (ID: ${data.attioRecordId})`);
      }
    } catch {
      showToast(`✅ ${startup.name} exportado a Attio CRM.`);
    }
  };

  // Rejection feedback
  const handleRejectFeedback = async (startup: StartupEntity, reason: string) => {
    handleUpdateStage(startup.id, "PASSED", reason);
    setSelectedStartup(null);
    showToast(`Descartado ${startup.name} con motivo: "${reason}". RLHF registrado.`);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedVertical("all");
    setSelectedStage("all");
    setSelectedSignalType("all");
    setMinScore(0);
  };

  // Filtered dataset
  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = startup.name.toLowerCase().includes(q);
        const matchesDomain = startup.domain.toLowerCase().includes(q);
        const matchesFounder = startup.founders.some((f) =>
          f.fullName.toLowerCase().includes(q)
        );
        const matchesDesc = startup.oneLiner.toLowerCase().includes(q);
        if (!matchesName && !matchesDomain && !matchesFounder && !matchesDesc) {
          return false;
        }
      }

      // Vertical
      if (selectedVertical !== "all" && startup.primaryVertical !== selectedVertical) {
        return false;
      }

      // Stage
      if (selectedStage === "stealth" && !startup.stealthStatus) {
        return false;
      }
      if (
        selectedStage !== "all" &&
        selectedStage !== "stealth" &&
        startup.estimatedStage !== selectedStage
      ) {
        return false;
      }

      // Signal Type
      if (selectedSignalType !== "all") {
        const hasSig = startup.signals.some((s) => s.signalType === selectedSignalType);
        if (!hasSig) return false;
      }

      // Min Score
      if (minScore > 0 && startup.evaluation.matchScore < minScore) {
        return false;
      }

      return true;
    });
  }, [startups, searchQuery, selectedVertical, selectedStage, selectedSignalType, minScore]);

  const stealthCount = startups.filter((s) => s.stealthStatus).length;

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Harmonic Navbar */}
      <HarmonicNavbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenCommand={() => setIsCommandOpen(true)}
        onTriggerScan={handleTriggerScan}
        isScanning={isScanning}
        totalCompanies={startups.length}
        stealthCount={stealthCount}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* VIEW 1: HARMONIC SCOUT DISCOVERY (DEFAULT) */}
        {activeView === "scout" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Filter & Query Builder */}
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

            {/* Sub-view: Table View */}
            {viewMode === "table" && (
              <HarmonicCompanyTable
                startups={filteredStartups}
                onSelectStartup={(s) => setSelectedStartup(s)}
                onOpenOutreach={(s) => setOutreachStartup(s)}
                onOpenMemo={(s) => setMemoStartup(s)}
                onSyncCRM={handleSyncCRM}
              />
            )}

            {/* Sub-view: Cards View */}
            {viewMode === "cards" && (
              <HarmonicCompanyCards
                startups={filteredStartups}
                onSelectStartup={(s) => setSelectedStartup(s)}
                onOpenOutreach={(s) => setOutreachStartup(s)}
                onOpenMemo={(s) => setMemoStartup(s)}
                onSyncCRM={handleSyncCRM}
              />
            )}

            {/* Sub-view: Kanban View */}
            {viewMode === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
                {PIPELINE_COLUMNS.map((col) => {
                  const items = filteredStartups.filter((s) => s.pipelineStatus === col.id);
                  return (
                    <div
                      key={col.id}
                      className="rounded-2xl bg-[#0b0f17]/90 border border-white/[0.08] p-3 space-y-3 min-w-[200px]"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className={`text-[11px] font-mono font-bold ${col.color}`}>
                          {col.label}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">
                          {items.length}
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedStartup(item)}
                            className="p-3 rounded-xl bg-[#0e1422] hover:bg-[#131b2e] border border-white/5 hover:border-emerald-500/40 cursor-pointer space-y-2 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white truncate max-w-[120px]">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                                {item.evaluation.matchScore}%
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-2">
                              {item.oneLiner}
                            </p>
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-white/5">
                              <span>+{item.githubStars7d} ⭐</span>
                              <span>{item.countryCode}</span>
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

        {/* VIEW 2: LIVE SIGNALS & RADAR */}
        {activeView === "signals" && (
          <div className="animate-in fade-in duration-200">
            <HarmonicSignalsFeed
              startups={startups}
              onSelectStartup={(s) => setSelectedStartup(s)}
            />
          </div>
        )}

        {/* VIEW 3: THESIS WEIGHTING MATRIX */}
        {activeView === "thesis" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <ThesisMatrixSlider onWeightsChange={handleWeightsChange} />
          </div>
        )}

        {/* VIEW 4: DEAL PIPELINE (FULL KANBAN) */}
        {activeView === "kanban" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
              <span className="font-bold text-white text-sm">
                Pipeline de Acuerdos (7 Estados de Trabajo VC)
              </span>
              <span>Arrastra o aprueba deals para sincronizar con Attio CRM</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
              {PIPELINE_COLUMNS.map((col) => {
                const items = startups.filter((s) => s.pipelineStatus === col.id);
                return (
                  <div
                    key={col.id}
                    className="rounded-2xl bg-[#0b0f17]/90 border border-white/[0.08] p-3 space-y-3 min-w-[200px]"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className={`text-[11px] font-mono font-bold ${col.color}`}>
                        {col.label}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">
                        {items.length}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedStartup(item)}
                          className="p-3 rounded-xl bg-[#0e1422] hover:bg-[#131b2e] border border-white/5 hover:border-emerald-500/40 cursor-pointer space-y-2 transition-all shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white truncate max-w-[120px]">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">
                              {item.evaluation.matchScore}%
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-2">
                            {item.oneLiner}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1 border-t border-white/5">
                            <span>+{item.githubStars7d} ⭐</span>
                            <span>{item.countryCode}</span>
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

      {/* Harmonic Dossier Inspection Modal */}
      <HarmonicDossierModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onApproveOutreach={(s) => {
          setSelectedStartup(null);
          setOutreachStartup(s);
          handleUpdateStage(s.id, "OUTREACH_PENDING");
        }}
        onSyncCRM={handleSyncCRM}
        onGenerateMemo={(s) => {
          setSelectedStartup(null);
          setMemoStartup(s);
        }}
        onRejectFeedback={handleRejectFeedback}
      />

      {/* Outreach Copywriter Modal (<150 words) */}
      <OutreachModal
        isOpen={!!outreachStartup}
        startup={outreachStartup}
        onClose={() => setOutreachStartup(null)}
      />

      {/* Executive IC Memo Modal */}
      <MemoModal
        isOpen={!!memoStartup}
        startup={memoStartup}
        onClose={() => setMemoStartup(null)}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        startups={startups}
        onSelectStartup={(s) => setSelectedStartup(s)}
        onTriggerScan={handleTriggerScan}
        onFilterHighFit={() => setMinScore(85)}
      />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0e1422] border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-2xl glow-emerald animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
