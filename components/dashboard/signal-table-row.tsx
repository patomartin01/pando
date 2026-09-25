"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import { GitCommit, Star, ExternalLink, ShieldAlert, Sparkles, Send, FileText, ArrowUpRight } from "lucide-react";

interface SignalTableRowProps {
  startup: StartupEntity;
  onSelect: (startup: StartupEntity) => void;
  onOpenOutreach: (startup: StartupEntity) => void;
  onOpenMemo: (startup: StartupEntity) => void;
  onOpenAgentStream: (startup: StartupEntity) => void;
}

export function SignalTableRow({
  startup,
  onSelect,
  onOpenOutreach,
  onOpenMemo,
  onOpenAgentStream,
}: SignalTableRowProps) {
  const score = startup.evaluation.matchScore;

  const getScoreBadge = () => {
    if (score >= 85) {
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 glow-emerald";
    }
    if (score >= 65) {
      return "text-amber-400 bg-amber-500/10 border-amber-500/30 glow-amber";
    }
    return "text-rose-400 bg-rose-500/10 border-rose-500/30";
  };

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group text-sm cursor-pointer">
      {/* Columna Match Score */}
      <td className="py-3.5 px-4 w-32" onClick={() => onSelect(startup)}>
        <div
          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border font-mono font-bold text-xs ${getScoreBadge()}`}
        >
          {score}% FIT
        </div>
      </td>

      {/* Startup & Dominio */}
      <td className="py-3.5 px-4" onClick={() => onSelect(startup)}>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
            {startup.name}
          </span>
          <span className="font-mono text-xs text-neutral-500">{startup.domain}</span>
          {startup.hasRedFlags && (
            <span title="Dealbreakers detectados" className="flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FAIL</span>
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-400 line-clamp-1 max-w-md mt-0.5">
          {startup.oneLiner}
        </p>
      </td>

      {/* Pedigree de Fundadores */}
      <td className="py-3.5 px-4 hidden lg:table-cell" onClick={() => onSelect(startup)}>
        <div className="flex flex-wrap gap-1.5">
          {startup.founderPedigree.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* Métricas de Señal (GitHub / Velocity) */}
      <td className="py-3.5 px-4 font-mono text-xs text-neutral-300 whitespace-nowrap" onClick={() => onSelect(startup)}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-300/90 font-medium">
            <Star className="w-3 h-3 fill-amber-300/20" /> +{startup.githubStars7d}
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <GitCommit className="w-3 h-3" /> {startup.commitVelocity}
          </span>
        </div>
      </td>

      {/* Etiqueta Vertical */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={() => onSelect(startup)}>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">
          {startup.primaryVertical}
        </span>
      </td>

      {/* Action Shortcuts */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            title="Ver razonamiento en vivo del agente"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAgentStream(startup);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-violet-500/20 text-neutral-400 hover:text-violet-300 border border-white/10 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            title="Generar correo de contacto"
            onClick={(e) => {
              e.stopPropagation();
              onOpenOutreach(startup);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-300 border border-white/10 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>

          <button
            title="Generar Investment Memo"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMemo(startup);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-neutral-400 hover:text-cyan-300 border border-white/10 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
