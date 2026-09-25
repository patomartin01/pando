"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { CommandMenu } from "@/components/navigation/command-menu";
import { RadarFeed } from "@/components/deal-flow/radar-feed";
import { KanbanBoard } from "@/components/deal-flow/kanban-board";
import { DealTable } from "@/components/deal-flow/deal-table";
import { NetworkGraph } from "@/components/deal-flow/network-graph";
import { StartupDrawer } from "@/components/deal-flow/startup-drawer";
import { MemoEditor } from "@/components/memos/memo-editor";
import { mockStartups } from "@/lib/mock-data";
import { StartupDeal, PipelineStage } from "@/types/startup";
import { Network, LayoutGrid, Table, Activity, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [startups, setStartups] = useState<StartupDeal[]>(mockStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupDeal | null>(null);
  const [memoStartup, setMemoStartup] = useState<StartupDeal | null>(null);
  const [activeTab, setActiveTab] = useState<"graph" | "kanban" | "table">("graph");
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isScraping, setIsScraping] = useState(false);

  // Run AI Scraper Simulation
  const handleRunScraper = () => {
    setIsScraping(true);
    setTimeout(() => {
      const newDeal: StartupDeal = {
        id: `pando-${Date.now()}`,
        name: "HyperScale AI",
        tagline: "Autonomous distributed training orchestrator for 100B+ parameter open-source models",
        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
        website: "https://hyperscale.ai",
        source: "github_velocity",
        stage: "sourced",
        sector: "AI Infrastructure",
        location: "San Francisco, CA",
        foundedYear: "2025",
        employees: "3 founders",
        fundingTarget: "$1.5M Pre-Seed",
        techStack: ["Python", "PyTorch", "Ray", "Kubernetes", "C++"],
        description: "HyperScale AI optimizes distributed GPU model training clusters by dynamically balancing memory shards across heterogeneous nodes, reducing cloud compute costs by up to 54%.",
        discoveredAt: "Just now",
        githubStars: 2940,
        githubStarGrowth28d: 410,
        growthScore: 98,
        founders: [
          {
            name: "Dr. Marcus Vance",
            role: "Co-Founder & CEO",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            previousCompany: "Ex-Meta AI Research",
          },
        ],
        metrics: [
          { label: "GitHub Velocity", value: "+410%", change: "Last 14 days", trend: "up" },
          { label: "GPU Cost Savings", value: "54%", change: "Tested on AWS A100s", trend: "up" },
        ],
        thesisMatch: {
          score: 98,
          recommendation: "High Alignment",
          pros: [
            "Incredible GitHub velocity (+410% growth).",
            "Addresses major compute cost bottleneck for frontier AI model developers.",
            "Meta AI Research founder background.",
          ],
          cons: [
            "Requires continuous maintenance against cloud provider GPU API updates.",
          ],
          keyQuestions: [
            "What is the average benchmark speedup on H100 SXM clusters?",
          ],
        },
      };

      setStartups((prev) => [newDeal, ...prev]);
      setIsScraping(false);
    }, 1800);
  };

  const handleMoveStage = (startupId: string, newStage: PipelineStage) => {
    setStartups((prev) =>
      prev.map((s) => (s.id === startupId ? { ...s, stage: newStage } : s))
    );
  };

  if (memoStartup) {
    return (
      <div className="min-h-screen bg-pando-dark text-white font-sans">
        <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} dealCount={startups.length} />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <MemoEditor startup={memoStartup} onBack={() => setMemoStartup(null)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans bg-grid-pando selection:bg-emerald-500 selection:text-black">
      {/* Navigation */}
      <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} dealCount={startups.length} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Live Signal Radar Banner */}
        <RadarFeed
          startups={startups}
          onSelectStartup={setSelectedStartup}
          onRunScraper={handleRunScraper}
          isScraping={isScraping}
        />

        {/* View Mode Switcher Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pando-border">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Activity className="h-6 w-6 text-emerald-400" />
              <span>Underground Root Network View</span>
            </h1>
            <p className="text-xs text-pando-muted font-mono">
              Mapping {startups.length} active sprouts across global deal flow nodes
            </p>
          </div>

          {/* View Tabs */}
          <div className="flex items-center gap-1 rounded-2xl border border-pando-border bg-pando-card p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab("graph")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "graph"
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow"
                  : "text-pando-muted hover:text-white"
              )}
            >
              <Network className="h-4 w-4" />
              <span>Root Topology Canvas</span>
            </button>

            <button
              onClick={() => setActiveTab("kanban")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "kanban"
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow"
                  : "text-pando-muted hover:text-white"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Kanban Board</span>
            </button>

            <button
              onClick={() => setActiveTab("table")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "table"
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow"
                  : "text-pando-muted hover:text-white"
              )}
            >
              <Table className="h-4 w-4" />
              <span>Dense Data Sheet</span>
            </button>
          </div>
        </div>

        {/* Tab View Render */}
        {activeTab === "graph" && (
          <NetworkGraph
            startups={startups}
            onSelectStartup={setSelectedStartup}
          />
        )}

        {activeTab === "kanban" && (
          <KanbanBoard
            startups={startups}
            onSelectStartup={setSelectedStartup}
            onMoveStage={handleMoveStage}
          />
        )}

        {activeTab === "table" && (
          <DealTable
            startups={startups}
            onSelectStartup={setSelectedStartup}
            onMoveStage={handleMoveStage}
          />
        )}
      </main>

      {/* Slide-over Drawer for Startup Details */}
      <StartupDrawer
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onGenerateMemo={(startup) => {
          setSelectedStartup(null);
          setMemoStartup(startup);
        }}
        onMoveStage={handleMoveStage}
      />

      {/* Command Menu Modal */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        startups={startups}
        onSelectStartup={setSelectedStartup}
        onTriggerScraper={handleRunScraper}
      />
    </div>
  );
}
