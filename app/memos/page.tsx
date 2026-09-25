"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { CommandMenu } from "@/components/navigation/command-menu";
import { MemoEditor } from "@/components/memos/memo-editor";
import { mockStartups } from "@/lib/mock-data";
import { StartupDeal } from "@/types/startup";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export default function MemosPage() {
  const [startups] = useState<StartupDeal[]>(mockStartups);
  const [selectedStartup, setSelectedStartup] = useState<StartupDeal | null>(mockStartups[0]);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pando-dark text-white font-sans bg-grid-pando">
      <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} dealCount={startups.length} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-pando-border pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-emerald-400" />
              <span>Investment Memos Studio</span>
            </h1>
            <p className="text-xs text-pando-muted font-mono">
              Auto-generated IC briefs and diligence memos for top-scored deals
            </p>
          </div>

          <div className="flex items-center gap-2">
            {startups.map((deal) => (
              <button
                key={deal.id}
                onClick={() => setSelectedStartup(deal)}
                className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all border ${
                  selectedStartup?.id === deal.id
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-glow"
                    : "bg-pando-card text-pando-muted border-pando-border hover:text-white"
                }`}
              >
                {deal.name}
              </button>
            ))}
          </div>
        </div>

        {selectedStartup ? (
          <MemoEditor startup={selectedStartup} onBack={() => {}} />
        ) : (
          <div className="text-center py-12 text-pando-muted text-xs font-mono">
            Select a startup above to view its auto-generated Investment Memo
          </div>
        )}
      </main>

      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        startups={startups}
        onSelectStartup={(s) => setSelectedStartup(s)}
        onTriggerScraper={() => {}}
      />
    </div>
  );
}
