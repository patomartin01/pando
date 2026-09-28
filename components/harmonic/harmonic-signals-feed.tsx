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
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#e4e5eb] shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#38cc38] animate-pulse" />
            <h2 className="text-base font-bold text-[#040508] tracking-tight">
              Feed de Señales Tempranas en Vivo (Harmonic Scout Radar)
            </h2>
          </div>
          <p className="text-xs text-[#6f727a]">
            Monitoreo continuo de repositorios de GitHub, registros WHOIS de sigilo y movimientos de talento técnico.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#eafbe9] text-[#15803d] border border-[#38cc38]/30 text-xs font-bold shadow-xs">
          ● RADAR ACTIVO
        </span>
      </div>

      {/* Signal Timeline Cards */}
      <div className="space-y-3">
        {allEvents.map((event, idx) => (
          <div
            key={event.id || idx}
            onClick={() => onSelectStartup(event.startup)}
            className="p-4 rounded-2xl bg-white hover:border-[#abadb3] border border-[#e4e5eb] transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              {/* Icon based on signal type */}
              <div className="p-2.5 rounded-xl bg-[#f0f1f5] border border-[#e4e5eb] text-[#5f42ff] group-hover:bg-[#f1edff] transition-colors">
                {event.signalType === "github_star_acceleration" && <TrendingUp className="w-4 h-4 text-[#16a34a]" />}
                {event.signalType === "commit_velocity_spike" && <GitCommit className="w-4 h-4 text-[#2491ff]" />}
                {event.signalType === "stealth_domain_registration" && <Globe className="w-4 h-4 text-[#d97706]" />}
                {event.signalType === "community_hype_spike" && <Zap className="w-4 h-4 text-[#5f42ff]" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#040508] group-hover:text-[#5f42ff] transition-colors">
                    {event.startup.name}
                  </span>
                  <span className="text-xs font-mono text-[#6f727a]">({event.startup.domain})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#f0f1f5] text-[#494b52] border border-[#e4e5eb] font-semibold">
                    {event.source}
                  </span>
                </div>

                <p className="text-xs text-[#212226]">
                  {event.signalType === "github_star_acceleration" &&
                    `Aceleración masiva de tracción: +${event.extractedMetrics.stars7d} estrellas en 7 días (${event.extractedMetrics.starsGrowthRate}).`}
                  {event.signalType === "commit_velocity_spike" &&
                    `Pico de velocidad técnica: Aumento de commits de ${event.extractedMetrics.commitVelocityIncrease} (${event.extractedMetrics.commitCount14d} commits / 14 días).`}
                  {event.signalType === "stealth_domain_registration" &&
                    `Nuevo dominio en stealth detectado: ${event.extractedMetrics.domainName} con nameservers privados.`}
                  {event.signalType === "community_hype_spike" &&
                    `Tracción viral en HackerNews: Show HN con alta velocidad de votos (+${event.extractedMetrics.upvoteVelocity} pts/h).`}
                </p>

                <div className="text-[10px] text-[#6f727a] font-mono pt-0.5">
                  Detectado: {new Date(event.detectedAt).toLocaleString()} • Match Score:{" "}
                  <strong className="text-[#5f42ff] font-bold">{event.startup.evaluation.matchScore}%</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#6f727a] group-hover:text-[#5f42ff] self-center transition-colors">
              <span className="hidden sm:inline">Inspeccionar</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
