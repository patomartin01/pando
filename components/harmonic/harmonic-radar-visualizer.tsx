"use client";

import React, { useState, useEffect } from "react";
import { StartupEntity } from "@/types/domain";
import {
  Compass,
  Sparkles,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  Zap,
  Target,
  Maximize2,
} from "lucide-react";

interface HarmonicRadarVisualizerProps {
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
}

export function HarmonicRadarVisualizer({
  startups,
  onSelectStartup,
}: HarmonicRadarVisualizerProps) {
  const [hoveredStartup, setHoveredStartup] = useState<StartupEntity | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [radarAngle, setRadarAngle] = useState(0);

  // Rotate beam
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Filter startups
  const displayedStartups = startups.filter((s) => {
    if (activeFilter === "stealth") return s.stealthStatus;
    if (activeFilter === "high_fit") return s.evaluation.matchScore >= 85;
    if (activeFilter !== "all") return s.primaryVertical === activeFilter;
    return true;
  });

  // Calculate coordinates on radar:
  // Center is (250, 250)
  // Radius based on 100 - matchScore (higher match = closer to center)
  // Angle distributed deterministically by index
  const radarItems = displayedStartups.map((s, index) => {
    const total = displayedStartups.length || 1;
    const angleRad = (index / total) * 2 * Math.PI - Math.PI / 2;
    // Score 100 -> radius 40, Score 50 -> radius 210
    const normalizedScore = Math.max(40, Math.min(99, s.evaluation.matchScore));
    const radius = 220 - ((normalizedScore - 40) / 60) * 170;

    const x = 250 + radius * Math.cos(angleRad);
    const y = 250 + radius * Math.sin(angleRad);

    // Calculate angle in degrees (0 to 360)
    let deg = (angleRad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    // Check if beam is currently passing this point (within 25 degrees)
    const diff = Math.abs(radarAngle - deg);
    const isLit = diff < 20 || diff > 340;

    return {
      startup: s,
      x,
      y,
      radius,
      isLit,
    };
  });

  return (
    <div className="relative w-full rounded-3xl bg-white border border-[#e4e5eb] p-6 overflow-hidden shadow-xs">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#f0f1f5] relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/20">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#040508] flex items-center gap-2">
                Pando Tactical AI Radar 360°
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#eafbe9] text-[#15803d] border border-[#38cc38]/30 font-bold">
                  REAL-TIME TELEMETRY
                </span>
              </h2>
              <p className="text-xs text-[#6f727a]">
                Mapeo polar de alta convicción: el centro representa ajuste máximo de tesis (100% Fit).
              </p>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: "all", label: "Todos los Objetivos" },
            { id: "high_fit", label: ">85% Alta Convicción" },
            { id: "stealth", label: "Solo Stealth" },
            { id: "AI Infrastructure", label: "AI Infra" },
            { id: "Developer Tools", label: "Dev Tools" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === f.id
                  ? "bg-[#040508] text-white shadow-xs font-bold"
                  : "bg-[#f0f1f5] hover:bg-[#e4e5eb] text-[#494b52] border border-[#e4e5eb]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tactical Radar Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Radar Circular Display (Left 7 cols) */}
        <div className="lg:col-span-7 flex justify-center items-center relative">
          <div className="relative w-[340px] sm:w-[460px] lg:w-[500px] h-[340px] sm:h-[460px] lg:h-[500px] rounded-full border border-[#d7d9e0] bg-[#f8f9fc] flex items-center justify-center shadow-inner">
            {/* Concentric rings */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-[#e4e5eb]" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-[#e4e5eb]" />
            <div className="absolute w-[40%] h-[40%] rounded-full border border-[#d7d9e0]" />
            <div className="absolute w-[20%] h-[20%] rounded-full border border-[#5f42ff]/30 bg-[#5f42ff]/[0.04]" />

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-[#e4e5eb]" />
            <div className="absolute h-full w-[1px] bg-[#e4e5eb]" />
            <div className="absolute w-full h-[1px] bg-[#f0f1f5] rotate-45" />
            <div className="absolute w-full h-[1px] bg-[#f0f1f5] -rotate-45" />

            {/* Radar Sweep Beam (SVG) */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <defs>
                <linearGradient id="radarBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5f42ff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5f42ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 250 250 L 500 250 A 250 250 0 0 0 426 74 Z"
                fill="url(#radarBeamGradient)"
              />
              <line x1="250" y1="250" x2="500" y2="250" stroke="#5f42ff" strokeWidth="1.5" />
            </svg>

            {/* Concentric Score Labels */}
            <span className="absolute top-[8%] text-[9px] font-mono text-[#6f727a] font-bold">
              60% FIT
            </span>
            <span className="absolute top-[18%] text-[9px] font-mono text-[#6f727a] font-bold">
              75% FIT
            </span>
            <span className="absolute top-[28%] text-[9px] font-mono text-[#5f42ff] font-bold">
              85% FIT
            </span>
            <span className="absolute top-[38%] text-[9px] font-mono text-[#5f42ff] font-bold">
              95% FIT
            </span>

            {/* Tactical Blips on Radar */}
            {radarItems.map(({ startup, x, y, isLit }) => {
              const isHovered = hoveredStartup?.id === startup.id;
              const isHigh = startup.evaluation.matchScore >= 85;

              return (
                <div
                  key={startup.id}
                  style={{
                    left: `${(x / 500) * 100}%`,
                    top: `${(y / 500) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredStartup(startup)}
                  onClick={() => onSelectStartup(startup)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                >
                  {/* Blip Ping */}
                  {(isLit || isHovered) && (
                    <span className="absolute -inset-2 rounded-full animate-ping opacity-75 bg-[#5f42ff]" />
                  )}

                  {/* Blip Core */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                      isHovered
                        ? "bg-[#040508] text-white scale-150 shadow-lg"
                        : isLit
                        ? "bg-[#5f42ff] text-white scale-125 shadow-md"
                        : isHigh
                        ? "bg-[#5f42ff] text-white border border-[#5f42ff]/40 shadow-xs"
                        : "bg-white text-[#494b52] border border-[#d7d9e0]"
                    }`}
                  >
                    {startup.name.slice(0, 1)}
                  </div>

                  {/* Label pill on hover */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none transition-all duration-200 whitespace-nowrap ${
                      isHovered || isLit
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1"
                    }`}
                  >
                    <span className="px-2 py-0.5 rounded-full bg-[#040508] border border-[#212226] text-[10px] font-mono text-white shadow-xl">
                      {startup.name} ({startup.evaluation.matchScore}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tactical Dossier Card Preview (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {hoveredStartup ? (
            <div className="p-5 rounded-2xl bg-white border border-[#e4e5eb] space-y-4 shadow-sm relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#5f42ff] font-bold uppercase tracking-wider">
                    {hoveredStartup.primaryVertical}
                  </span>
                  <h3 className="text-xl font-bold text-[#040508] flex items-center gap-2">
                    {hoveredStartup.name}
                    {hoveredStartup.stealthStatus && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#edf6ff] text-[#2491ff] border border-[#2491ff]/30 font-mono font-bold">
                        STEALTH
                      </span>
                    )}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#5f42ff] font-mono">
                    {hoveredStartup.evaluation.matchScore}%
                  </div>
                  <span className="text-[10px] font-mono text-[#6f727a]">THESIS FIT</span>
                </div>
              </div>

              <p className="text-xs text-[#494b52] leading-relaxed">
                {hoveredStartup.oneLiner}
              </p>

              {/* Signals summary */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-0.5">
                  <span className="text-[10px] text-[#6f727a]">7D STARS GROWTH</span>
                  <div className="font-bold text-[#16a34a]">+{hoveredStartup.githubStars7d} ⭐</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-0.5">
                  <span className="text-[10px] text-[#6f727a]">COMMIT VELOCITY</span>
                  <div className="font-bold text-[#040508]">{hoveredStartup.commitVelocity}</div>
                </div>
              </div>

              {/* Founder Pedigree */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#6f727a] uppercase font-bold">
                  Fundadores & Pedigree:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {hoveredStartup.founders.map((f) => (
                    <span
                      key={f.id}
                      className="px-2 py-0.5 rounded-md bg-[#f0f1f5] border border-[#e4e5eb] text-[11px] text-[#212226] font-medium"
                    >
                      {f.fullName} ({f.exCompanies.slice(0, 1).join("")})
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Evaluation Pillar */}
              <div className="p-3.5 rounded-xl bg-[#f1edff] border border-[#5f42ff]/20 text-xs text-[#5f42ff] space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Por qué encaja con la Tesis:</span>
                </div>
                <p className="text-[11px] text-[#212226] leading-relaxed">
                  {hoveredStartup.evaluation.summaryBullets[0]}
                </p>
              </div>

              {/* Inspect Button */}
              <button
                onClick={() => onSelectStartup(hoveredStartup)}
                className="w-full py-2.5 rounded-full bg-[#040508] hover:bg-[#212226] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Inspeccionar Dossier Completo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-[#e4e5eb] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#f1edff] text-[#5f42ff] flex items-center justify-center mx-auto border border-[#5f42ff]/20">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#040508]">Modo Radar Activo</h4>
              <p className="text-xs text-[#6f727a] leading-relaxed max-w-xs mx-auto">
                Pasa el cursor por cualquier objetivo en el radar o selecciona un punto para inspeccionar telemetría, señales de GitHub y pedigree de fundadores.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
