"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { CommandMenu } from "@/components/navigation/command-menu";
import { RadarFeed } from "@/components/deal-flow/radar-feed";
import { KanbanBoard } from "@/components/deal-flow/kanban-board";
import { DealTable } from "@/components/deal-flow/deal-table";
import { StartupDrawer } from "@/components/deal-flow/startup-drawer";
import { MemoEditor } from "@/components/memos/memo-editor";
import { mockStartups } from "@/lib/mock-data";
import { StartupDeal, PipelineStage } from "@/types/startup";
import { LayoutGrid, Table, Sparkles, Filter, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [startups, setStartups] = useState<StartupDeal[]>(mockStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupDeal | null>(null);
  const [memoStartup, setMemoStartup] = useState<StartupDeal | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
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
    }, 2000);
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
    <div className="min-h-screen bg-pando-dark text-white font-sans bg-grid-pando">
      {/* Navigation */}
      <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} dealCount={startups.length} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Live Signal Radar Banner */}
        <RadarFeed
          startups={startups}
          onSelectStartup={setSelectedStartup}
          onRunScraper={handleRunScraper}
          isScraping={isScraping}
        />

        {/* Pipeline Controls & Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pando-border">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <span>Pando Deal Flow Pipeline</span>
            </h1>
            <p className="text-xs text-pando-muted font-mono">
              Showing {startups.length} deals mapped across root network stages
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-pando-border bg-pando-card p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "kanban"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "text-pando-muted hover:text-white"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Kanban</span>
            </button>

            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "table"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "text-pando-muted hover:text-white"
              )}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Dense Table</span>
            </button>
          </div>
        </div>

        {/* View Component */}
        {viewMode === "kanban" ? (
          <KanbanBoard
            startups={startups}
            onSelectStartup={setSelectedStartup}
            onMoveStage={handleMoveStage}
          />
        ) : (
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
