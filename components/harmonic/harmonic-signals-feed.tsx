"use client";

import React from "react";
import { StartupEntity } from "@/types/domain";
import {
  Radio,
  TrendingUp,
  GitCommit,
  Globe,
  Award,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface HarmonicSignalsFeedProps {
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
}

export function HarmonicSignalsFeed({
  startups,
  onSelectStartup,
}: HarmonicSignalsFeedProps) {
  // Aggregate and sort all signals from all startups
  const allEvents = startups.flatMap((s) =>
    s.signals.map((sig) => ({
      ...sig,
      startup: s,
    }))
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-white/10 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Feed de Señales Tempranas en Vivo (Harmonic Scout Radar)
            </h2>
          </div>
          <p className="text-xs text-neutral-300">
            Monitoreo continuo de repositorios de GitHub, registros WHOIS de sigilo y movimientos de talento técnico.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]">
          ● RADAR ACTIVO
        </span>
      </div>

      {/* Signal Timeline Cards */}
      <div className="space-y-3">
        {allEvents.map((event, idx) => (
          <div
            key={event.id || idx}
            onClick={() => onSelectStartup(event.startup)}
            className="p-4 rounded-xl bg-[#0e1422]/90 hover:bg-[#12192b] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer group shadow-lg flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              {/* Icon based on signal type */}
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                {event.signalType === "github_star_acceleration" && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                {event.signalType === "commit_velocity_spike" && <GitCommit className="w-4 h-4 text-cyan-400" />}
                {event.signalType === "stealth_domain_registration" && <Globe className="w-4 h-4 text-amber-400" />}
                {event.signalType === "community_hype_spike" && <Zap className="w-4 h-4 text-violet-400" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                    {event.startup.name}
                  </span>
                  <span className="text-xs text-neutral-400">({event.startup.domain})</span>
                  <span className="px-2 py-0.2 rounded text-[10px] bg-white/5 text-neutral-300 border border-white/10">
                    {event.source}
                  </span>
                </div>

                <p className="text-xs text-neutral-200">
                  {event.signalType === "github_star_acceleration" &&
                    `Aceleración masiva de tracción: +${event.extractedMetrics.stars7d} estrellas en 7 días (${event.extractedMetrics.starsGrowthRate}).`}
                  {event.signalType === "commit_velocity_spike" &&
                    `Pico de velocidad técnica: Aumento de commits de ${event.extractedMetrics.commitVelocityIncrease} (${event.extractedMetrics.commitCount14d} commits / 14 días).`}
                  {event.signalType === "stealth_domain_registration" &&
                    `Nuevo dominio en stealth detectado: ${event.extractedMetrics.domainName} con nameservers privados.`}
                  {event.signalType === "community_hype_spike" &&
                    `Tracción viral en HackerNews: Show HN con alta velocidad de votos (+${event.extractedMetrics.upvoteVelocity} pts/h).`}
                </p>

                <div className="text-[10px] text-neutral-400 pt-0.5">
                  Detectado: {new Date(event.detectedAt).toLocaleString()} • Match Score:{" "}
                  <strong className="text-emerald-400">{event.startup.evaluation.matchScore}%</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-emerald-400 self-center transition-colors">
              <span className="hidden sm:inline">Inspeccionar</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
