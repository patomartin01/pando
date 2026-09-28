"use client";

import React, { useState } from "react";
import { StartupEntity } from "@/types/domain";
import { Network, Users, Building, GraduationCap, Sparkles, ArrowRight } from "lucide-react";

interface HarmonicNetworkGraphProps {
  startups: StartupEntity[];
  onSelectStartup: (startup: StartupEntity) => void;
}

export function HarmonicNetworkGraph({
  startups,
  onSelectStartup,
}: HarmonicNetworkGraphProps) {
  const [activeStartupId, setActiveStartupId] = useState<string>(startups[0]?.id || "");
  const selected = startups.find((s) => s.id === activeStartupId) || startups[0];

  return (
    <div className="w-full rounded-3xl bg-white border border-[#e4e5eb] p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f0f1f5]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#040508] flex items-center gap-2">
              Founder Pedigree & Co-Workers Overlap Graph
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f1edff] text-[#5f42ff] border border-[#5f42ff]/30 font-bold">
                TALENT DENSITY
              </span>
            </h2>
            <p className="text-xs text-[#6f727a]">
              Mapeo de procedencia de fundadores y tiempo compartido en empresas anteriores (Harmonic Talent DNA).
            </p>
          </div>
        </div>

        {/* Startup Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl">
          {startups.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStartupId(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeStartupId === s.id
                  ? "bg-[#040508] text-white font-bold shadow-xs"
                  : "bg-[#f0f1f5] hover:bg-[#e4e5eb] text-[#494b52] border border-[#e4e5eb]"
              }`}
            >
              {s.name} ({s.evaluation.matchScore}%)
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Visual Canvas */}
      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual SVG Topology Graph (7 Cols) */}
          <div className="lg:col-span-7 bg-[#f8f9fc] rounded-2xl border border-[#e4e5eb] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
            {/* SVG Connecting Curves */}
            <svg className="w-full h-72 relative z-10" viewBox="0 0 600 300">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5f42ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Connecting paths from ex-institutions (top) to founders (middle) */}
              <path
                d="M 120 50 Q 200 110 200 150"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="animate-pulse"
                fill="none"
              />
              <path
                d="M 480 50 Q 400 110 400 150"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="animate-pulse"
                fill="none"
              />

              {/* Connecting paths from founders to company (center bottom) */}
              <path
                d="M 200 180 Q 250 220 300 240"
                stroke="#16a34a"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 400 180 Q 350 220 300 240"
                stroke="#16a34a"
                strokeWidth="3"
                fill="none"
              />

              {/* Co-worker overlap horizontal bridge between founders */}
              <path
                d="M 240 160 L 360 160"
                stroke="#5f42ff"
                strokeWidth="2.5"
                strokeDasharray="3,3"
                fill="none"
              />

              {/* TOP INSTITUTION NODES */}
              <g transform="translate(120, 40)">
                <circle r="22" fill="#f1edff" stroke="#5f42ff" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#5f42ff" fontSize="9" fontWeight="bold">
                  EX-ORG
                </text>
              </g>

              <g transform="translate(480, 40)">
                <circle r="22" fill="#f1edff" stroke="#5f42ff" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#5f42ff" fontSize="9" fontWeight="bold">
                  ALUMNI
                </text>
              </g>

              {/* MIDDLE FOUNDER NODES */}
              <g transform="translate(200, 160)">
                <circle r="26" fill="#ffffff" stroke="#2491ff" strokeWidth="2.5" />
                <text textAnchor="middle" dy="4" fill="#040508" fontSize="11" fontWeight="bold">
                  {selected.founders[0]?.fullName.slice(0, 2).toUpperCase() || "F1"}
                </text>
              </g>

              <g transform="translate(400, 160)">
                <circle r="26" fill="#ffffff" stroke="#2491ff" strokeWidth="2.5" />
                <text textAnchor="middle" dy="4" fill="#040508" fontSize="11" fontWeight="bold">
                  {selected.founders[1]?.fullName.slice(0, 2).toUpperCase() || "F2"}
                </text>
              </g>

              {/* Overlap Badge */}
              <g transform="translate(300, 150)">
                <rect x="-45" y="-12" width="90" height="24" rx="12" fill="#f1edff" stroke="#5f42ff" strokeWidth="1" />
                <text textAnchor="middle" dy="4" fill="#5f42ff" fontSize="9" fontWeight="bold">
                  CO-WORKERS
                </text>
              </g>

              {/* TARGET STARTUP NODE (BOTTOM CENTER) */}
              <g transform="translate(300, 250)">
                <circle r="32" fill="#040508" stroke="#5f42ff" strokeWidth="3" />
                <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="12" fontWeight="bold">
                  {selected.name.slice(0, 4).toUpperCase()}
                </text>
              </g>
            </svg>

            <span className="text-[11px] font-mono text-[#6f727a] mt-2">
              Línea púrpura: Convivencia laboral previa demostrada antes de fundar la empresa.
            </span>
          </div>

          {/* Pedigree Breakdown Detail (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-[#e4e5eb] space-y-4 shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-[#5f42ff] uppercase font-bold tracking-wider">
                  TEAM PEDIGREE BREAKDOWN
                </span>
                <h3 className="text-xl font-bold text-[#040508] mt-1">
                  {selected.name}
                </h3>
                <p className="text-xs text-[#6f727a] mt-1">
                  {selected.oneLiner}
                </p>
              </div>

              {/* Founder Cards with Overlap */}
              <div className="space-y-3">
                {selected.founders.map((f, i) => (
                  <div
                    key={f.id}
                    className="p-3.5 rounded-xl bg-[#f8f9fc] border border-[#e4e5eb] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#f1edff] text-[#5f42ff] font-bold text-xs flex items-center justify-center border border-[#5f42ff]/30">
                          {f.fullName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#040508]">{f.fullName}</div>
                          <div className="text-[10px] text-[#6f727a]">{f.role}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#eafbe9] text-[#15803d] border border-[#38cc38]/30 font-bold">
                        {f.isTechnical ? "TECHNICAL" : "OPERATOR"}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#494b52] flex items-center gap-1.5 pt-1">
                      <Building className="w-3 h-3 text-[#6f727a] shrink-0" />
                      <span>Ex: <strong className="text-[#040508]">{f.exCompanies.join(", ")}</strong></span>
                    </div>

                    {f.academicBackground && f.academicBackground.length > 0 && (
                      <div className="text-[11px] text-[#6f727a] flex items-center gap-1.5">
                        <GraduationCap className="w-3 h-3 text-[#6f727a] shrink-0" />
                        <span>{f.academicBackground[0].degree} — {f.academicBackground[0].institution}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Overlap Summary */}
              {selected.founders[0]?.teamOverlapMatrix && selected.founders[0].teamOverlapMatrix.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#f1edff] border border-[#5f42ff]/20 text-xs text-[#5f42ff] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#5f42ff]" />
                    <span>Validación de Sinergia de Equipo:</span>
                  </div>
                  <p className="text-[11px] text-[#212226] leading-relaxed">
                    {selected.founders[0].fullName} y {selected.founders[0].teamOverlapMatrix[0].coFounderName} compartieron {selected.founders[0].teamOverlapMatrix[0].yearsOverlapped} años en {selected.founders[0].teamOverlapMatrix[0].previousCompany}, reduciendo el riesgo de ruptura de co-founders en etapas tempranas.
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => onSelectStartup(selected)}
                className="w-full py-2.5 rounded-full bg-[#040508] hover:bg-[#212226] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Ver Dossier Completo de {selected.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
