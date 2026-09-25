"use client";

import React from "react";
import { StartupDeal, PipelineStage } from "@/types/startup";
import { 
  X, 
  ExternalLink, 
  Github, 
  MapPin, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText,
  Building2,
  Calendar,
  Globe,
  DollarSign,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StartupDrawerProps {
  startup: StartupDeal | null;
  onClose: () => void;
  onGenerateMemo: (startup: StartupDeal) => void;
  onMoveStage: (startupId: string, stage: PipelineStage) => void;
}

export const StartupDrawer: React.FC<StartupDrawerProps> = ({
  startup,
  onClose,
  onGenerateMemo,
  onMoveStage,
}) => {
  if (!startup) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-pando-card border-l border-pando-border h-full overflow-y-auto z-10 p-6 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-pando-border pb-5 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={startup.logo}
                alt={startup.name}
                className="h-14 w-14 rounded-2xl object-cover border border-pando-border shadow-md"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-sans text-2xl font-bold text-white tracking-tight">
                    {startup.name}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-3 py-0.5 text-xs font-mono font-bold border",
                      startup.thesisMatch.score >= 90
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-glow"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    )}
                  >
                    {startup.thesisMatch.score}% Match
                  </span>
                </div>
                <p className="text-xs text-pando-muted mt-1">{startup.tagline}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-pando-border bg-pando-dark/80 p-2 text-pando-muted hover:text-white hover:border-emerald-500/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl border border-pando-border bg-pando-dark/50 p-3">
              <span className="text-[10px] font-mono text-pando-muted uppercase">Sector</span>
              <p className="font-semibold text-xs text-white mt-0.5 truncate">{startup.sector}</p>
            </div>
            <div className="rounded-xl border border-pando-border bg-pando-dark/50 p-3">
              <span className="text-[10px] font-mono text-pando-muted uppercase">Location</span>
              <p className="font-semibold text-xs text-white mt-0.5 truncate">{startup.location}</p>
            </div>
            <div className="rounded-xl border border-pando-border bg-pando-dark/50 p-3">
              <span className="text-[10px] font-mono text-pando-muted uppercase">Funding Target</span>
              <p className="font-semibold text-xs text-emerald-400 mt-0.5 truncate">{startup.fundingTarget || "N/A"}</p>
            </div>
            <div className="rounded-xl border border-pando-border bg-pando-dark/50 p-3">
              <span className="text-[10px] font-mono text-pando-muted uppercase">Signal Source</span>
              <p className="font-semibold text-xs text-cyan-400 capitalize mt-0.5 truncate">{startup.source.replace("_", " ")}</p>
            </div>
          </div>

          {/* About / Description */}
          <div className="mb-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-pando-muted mb-2">
              Startup Overview
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-pando-dark/40 rounded-xl p-3.5 border border-pando-border">
              {startup.description}
            </p>
          </div>

          {/* Telemetry Metrics */}
          <div className="mb-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-pando-muted mb-3">
              Telemetry & Traction Signals
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {startup.metrics.map((m, idx) => (
                <div key={idx} className="rounded-xl border border-pando-border bg-pando-hover/40 p-3">
                  <span className="text-[10px] font-mono text-pando-muted">{m.label}</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-bold text-base text-white font-mono">{m.value}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founders */}
          <div className="mb-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-pando-muted mb-3">
              Founding Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {startup.founders.map((f, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-xl border border-pando-border bg-pando-dark/50 p-3">
                  <img src={f.avatar} alt={f.name} className="h-10 w-10 rounded-full object-cover border border-pando-border" />
                  <div>
                    <span className="font-bold text-xs text-white">{f.name}</span>
                    <p className="text-[10px] text-pando-muted">{f.role}</p>
                    {f.previousCompany && (
                      <span className="text-[9px] font-mono text-emerald-400">{f.previousCompany}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-pando-muted mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {startup.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-pando-hover border border-pando-border px-2.5 py-1 font-mono text-[11px] text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* AI Thesis Matcher Breakdown */}
          <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                Pando AI Thesis Alignment Rationale
              </h3>
            </div>

            {/* Pros */}
            <div className="mb-3">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Key Strengths</span>
              <ul className="mt-1 space-y-1">
                {startup.thesisMatch.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            {startup.thesisMatch.cons.length > 0 && (
              <div className="mb-3">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Risks & Considerations</span>
                <ul className="mt-1 space-y-1">
                  {startup.thesisMatch.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-pando-border flex items-center gap-3">
          <button
            onClick={() => onGenerateMemo(startup)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-4 py-3 text-xs font-bold text-white shadow-glow transition-all"
          >
            <FileText className="h-4 w-4" />
            <span>Generate Investment Memo</span>
          </button>

          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-pando-border bg-pando-dark p-3 text-pando-muted hover:text-white hover:border-pando-border transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
