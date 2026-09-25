"use client";

import React, { useState } from "react";
import { StartupEntity, InvestmentMemo } from "@/types/domain";
import { generateExecutiveMemo } from "@/lib/engine/memo";
import { X, Copy, Check, FileText, Download, Sparkles } from "lucide-react";

interface MemoModalProps {
  startup: StartupEntity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemoModal({ startup, isOpen, onClose }: MemoModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !startup) return null;

  const memo: InvestmentMemo = generateExecutiveMemo(startup);

  const handleCopy = () => {
    navigator.clipboard.writeText(memo.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([memo.markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MEMO_${startup.name.toUpperCase()}_${memo.date}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                One-Pager Executive Investment Memo
              </h3>
              <p className="text-xs text-neutral-400">
                Investment Committee Brief: {startup.name} | Match: {memo.matchScore}/100
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Markdown Render Container */}
        <div className="bg-black/60 p-5 rounded-xl border border-white/10 font-mono text-xs text-neutral-200 overflow-y-auto max-h-[55vh] whitespace-pre-wrap leading-relaxed select-text">
          {memo.markdownContent}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs font-mono text-neutral-500">
            Formato: Markdown estándar para Notion / Attio / IC Deck
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .md</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white transition-all glow-violet"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copiado al Portapapeles" : "Copiar Markdown"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
