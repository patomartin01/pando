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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl glass-panel border border-white/10 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Outreach Copywriter Agéntico (&lt;150 Palabras)
              </h3>
              <p className="text-xs text-neutral-400">Target: {startup.name} / {draft.recipientName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Signal Hook Badge */}
        <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase">Señal Detectada Utilizada como Gancho:</span>
          <p className="text-xs font-mono text-emerald-400 font-semibold">{draft.signalHookUsed}</p>
        </div>

        {/* Email Subject */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-neutral-400">Asunto del Correo:</label>
          <div className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white">
            {draft.subjectLine}
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-neutral-400">Cuerpo del Correo (Zero Fluff, Soft CTA):</label>
          <div className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-xs font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed">
            {draft.emailBody}
          </div>
        </div>

        {/* Personalization Points */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {draft.personalizationPoints.map((point, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
              ✓ {point}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs font-mono text-neutral-500">
            Seguimiento sugerido: cada {draft.suggestedFollowUpDays} días
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all glow-emerald"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copiado al Portapapeles" : "Copiar Correo Completo"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
