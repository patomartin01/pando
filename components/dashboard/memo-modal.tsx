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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#e4e5eb] rounded-2xl p-6 sm:p-8 z-10 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-[#f0f1f5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f1edff] border border-[#5f42ff]/30 text-[#5f42ff]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#040508]">
                One-Pager Executive Investment Memo
              </h3>
              <p className="text-xs text-[#6f727a]">
                Investment Committee Brief: {startup.name} | Match: {memo.matchScore}/100
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#6f727a] hover:text-[#040508] hover:bg-[#f0f1f5] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Markdown Render Container */}
        <div className="bg-[#f8f9fc] p-5 rounded-2xl border border-[#e4e5eb] font-mono text-xs text-[#212226] overflow-y-auto max-h-[55vh] whitespace-pre-wrap leading-relaxed select-text shadow-2xs">
          {memo.markdownContent}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#f0f1f5]">
          <span className="text-xs text-[#6f727a]">
            Formato: Markdown estándar para Notion / Attio / IC Deck
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#f0f1f5] text-[#040508] border border-[#e4e5eb] transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .md</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#040508] hover:bg-[#212226] text-white transition-all shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#38cc38]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copiado al Portapapeles" : "Copiar Markdown"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
