"use client";

import React, { useState } from "react";
import { StartupEntity, OutreachDraft } from "@/types/domain";
import { generatePersonalizedOutreach } from "@/lib/engine/outreach";
import { X, Copy, Check, Send, Sparkles } from "lucide-react";

interface OutreachModalProps {
  startup: StartupEntity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OutreachModal({ startup, isOpen, onClose }: OutreachModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !startup) return null;

  const draft: OutreachDraft = generatePersonalizedOutreach(startup);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${draft.subjectLine}\n\n${draft.emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-[#e4e5eb] rounded-2xl p-6 sm:p-8 z-10 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-[#f0f1f5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f1edff] border border-[#5f42ff]/30 text-[#5f42ff]">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#040508]">
                Outreach Copywriter Agéntico (&lt;150 Palabras)
              </h3>
              <p className="text-xs text-[#6f727a]">Target: {startup.name} / {draft.recipientName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#6f727a] hover:text-[#040508] hover:bg-[#f0f1f5] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Signal Hook Badge */}
        <div className="bg-[#f8f9fc] p-3.5 rounded-xl border border-[#e4e5eb] space-y-1">
          <span className="text-[10px] font-mono text-[#6f727a] uppercase font-semibold">Señal Detectada Utilizada como Gancho:</span>
          <p className="text-xs font-semibold text-[#5f42ff]">{draft.signalHookUsed}</p>
        </div>

        {/* Email Subject */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#6f727a]">Asunto del Correo:</label>
          <div className="w-full bg-[#f8f9fc] border border-[#e4e5eb] rounded-xl px-3.5 py-2.5 text-xs text-[#040508] font-medium">
            {draft.subjectLine}
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#6f727a]">Cuerpo del Correo (Zero Fluff, Soft CTA):</label>
          <div className="w-full bg-[#f8f9fc] border border-[#e4e5eb] rounded-xl p-4 text-xs text-[#212226] whitespace-pre-wrap leading-relaxed font-sans">
            {draft.emailBody}
          </div>
        </div>

        {/* Personalization Points */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {draft.personalizationPoints.map((point, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f1f5] text-[#494b52] border border-[#e4e5eb] font-semibold">
              ✓ {point}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#f0f1f5]">
          <span className="text-xs text-[#6f727a]">
            Seguimiento sugerido: cada {draft.suggestedFollowUpDays} días
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#040508] hover:bg-[#212226] text-white transition-all shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#38cc38]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copiado al Portapapeles" : "Copiar Correo Completo"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
