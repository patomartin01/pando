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
    <div className="relative w-full rounded-3xl bg-[#060911]/90 border border-white/[0.08] backdrop-blur-2xl p-6 overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Pando Tactical AI Radar 360°
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  REAL-TIME TELEMETRY
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Mapeo polar de alta convicción: el centro representa ajuste máximo de tesis (100% Fit).
              </p>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
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
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                activeFilter === f.id
                  ? "bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5"
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
          <div className="relative w-[340px] sm:w-[460px] lg:w-[500px] h-[340px] sm:h-[460px] lg:h-[500px] rounded-full border border-emerald-500/20 bg-[#04070e] flex items-center justify-center shadow-[inset_0_0_60px_rgba(16,185,129,0.06)]">
            {/* Concentric rings */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-500/15" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-emerald-500/15" />
            <div className="absolute w-[40%] h-[40%] rounded-full border border-emerald-500/20" />
            <div className="absolute w-[20%] h-[20%] rounded-full border border-emerald-500/30 bg-emerald-500/[0.04]" />

            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-emerald-500/15" />
            <div className="absolute h-full w-[1px] bg-emerald-500/15" />
            <div className="absolute w-full h-[1px] bg-emerald-500/10 rotate-45" />
            <div className="absolute w-full h-[1px] bg-emerald-500/10 -rotate-45" />

            {/* Radar Sweep Beam (SVG) */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <defs>
                <linearGradient id="radarBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 250 250 L 500 250 A 250 250 0 0 0 426 74 Z"
                fill="url(#radarBeamGradient)"
              />
              <line x1="250" y1="250" x2="500" y2="250" stroke="#34d399" strokeWidth="1.5" />
            </svg>

            {/* Concentric Score Labels */}
            <span className="absolute top-[8%] text-[9px] font-mono text-emerald-500/60 font-bold">
              60% FIT
            </span>
            <span className="absolute top-[18%] text-[9px] font-mono text-emerald-500/70 font-bold">
              75% FIT
            </span>
            <span className="absolute top-[28%] text-[9px] font-mono text-emerald-500/80 font-bold">
              85% FIT
            </span>
            <span className="absolute top-[38%] text-[9px] font-mono text-emerald-400 font-bold">
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
                    <span className="absolute -inset-2 rounded-full animate-ping opacity-75 bg-emerald-400" />
                  )}

                  {/* Blip Core */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                      isHovered
                        ? "bg-white text-black scale-150 shadow-[0_0_20px_#ffffff]"
                        : isLit
                        ? "bg-emerald-400 text-black scale-125 shadow-[0_0_15px_#10b981]"
                        : isHigh
                        ? "bg-emerald-500/90 text-white border border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        : "bg-slate-800 text-slate-300 border border-white/20"
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
                    <span className="px-2 py-0.5 rounded-md bg-[#0e1422] border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-xl">
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
            <div className="p-5 rounded-2xl bg-[#090e18] border border-emerald-500/30 space-y-4 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    {hoveredStartup.primaryVertical}
                  </span>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {hoveredStartup.name}
                    {hoveredStartup.stealthStatus && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                        STEALTH
                      </span>
                    )}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {hoveredStartup.evaluation.matchScore}%
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">THESIS FIT</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {hoveredStartup.oneLiner}
              </p>

              {/* Signals summary */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500">7D STARS GROWTH</span>
                  <div className="font-bold text-emerald-400">+{hoveredStartup.githubStars7d} ⭐</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500">COMMIT VELOCITY</span>
                  <div className="font-bold text-white">{hoveredStartup.commitVelocity}</div>
                </div>
              </div>

              {/* Founder Pedigree */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                  Fundadores & Pedigree:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {hoveredStartup.founders.map((f) => (
                    <span
                      key={f.id}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-200"
                    >
                      {f.fullName} ({f.exCompanies.slice(0, 1).join("")})
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Evaluation Pillar */}
              <div className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Por qué encaja con la Tesis:</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  {hoveredStartup.evaluation.summaryBullets[0]}
                </p>
              </div>

              {/* Inspect Button */}
              <button
                onClick={() => onSelectStartup(hoveredStartup)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Inspeccionar Dossier Completo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#090e18]/60 border border-white/5 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 animate-pulse">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Modo Radar Activo</h4>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Pasa el cursor por cualquier objetivo en el radar o selecciona un punto para inspeccionar telemetría, señales de GitHub y pedigree de fundadores.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
