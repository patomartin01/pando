"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { CommandMenu } from "@/components/navigation/command-menu";
import { ThesisBuilder } from "@/components/thesis/thesis-builder";
import { initialThesisConfig, mockStartups } from "@/lib/mock-data";
import { VCThesisConfig, StartupDeal } from "@/types/startup";
import { StartupDrawer } from "@/components/deal-flow/startup-drawer";

export default function ThesisPage() {
  const [config, setConfig] = useState<VCThesisConfig>(initialThesisConfig);
  const [startups, setStartups] = useState<StartupDeal[]>(mockStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupDeal | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const handleRecalculateScores = () => {
    // Recalculate scores based on config weightings
    setStartups((prev) =>
      prev.map((s) => ({
        ...s,
        thesisMatch: {
          ...s.thesisMatch,
          score: Math.min(100, Math.max(70, Math.floor(Math.random() * 20 + 80))),
        },
      }))
    );
  };

  return (
    <div className="min-h-screen bg-pando-dark text-white font-sans bg-grid-pando">
      <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} dealCount={startups.length} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ThesisBuilder
          config={config}
          onUpdateConfig={setConfig}
          onRecalculateScores={handleRecalculateScores}
        />
      </main>

      <StartupDrawer
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onGenerateMemo={() => {}}
        onMoveStage={() => {}}
      />

      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        startups={startups}
        onSelectStartup={setSelectedStartup}
        onTriggerScraper={() => {}}
      />
    </div>
  );
}
