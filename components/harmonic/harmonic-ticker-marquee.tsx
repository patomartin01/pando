"use client";

import React from "react";
import { Zap, Radio, Sparkles, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

interface TickerItem {
  id: string;
  tag: string;
  tagColor: string;
  text: string;
  time: string;
  isHot?: boolean;
}

const TICKER_EVENTS: TickerItem[] = [
  {
    id: "1",
    tag: "STEALTH REGISTRATION",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    text: "cachemesh.ai — Dominio privado registrado por Ex-Founding Team de Databricks",
    time: "hace 4m",
    isHot: true,
  },
  {
    id: "2",
    tag: "STAR ACCELERATION",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    text: "hyperflow.dev superó +1,350 ⭐ en 7 días (Trending #1 GitHub Rust)",
    time: "hace 12m",
    isHot: true,
  },
  {
    id: "3",
    tag: "TALENT OVERLAP",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    text: "2 Principal Engineers de Stripe fundaron infra secreto de pagos WebAssembly",
    time: "hace 26m",
  },
  {
    id: "4",
    tag: "HIGH CONVICTION 94%",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    text: "TensorScale — AI Model Optimization pasa los 4 Hard Filters del Fondo",
    time: "hace 41m",
    isHot: true,
  },
  {
    id: "5",
    tag: "SHOW HN VIRAL",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    text: "ZeroGuard AI WAF alcanzó 620 upvotes en Hacker News en menos de 6 horas",
    time: "hace 1h",
  },
  {
    id: "6",
    tag: "COMMITS VELOCITY",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    text: "Neuromorph Systems aceleró a 420 commits/mes en su core C++ / CUDA",
    time: "hace 2h",
  },
];

export function HarmonicTickerMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#070b14]/90 border-b border-white/[0.06] backdrop-blur-md py-2 px-4 flex items-center z-20">
      {/* Live Indicator Pill */}
      <div className="flex items-center gap-2 pr-4 border-r border-white/10 shrink-0 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" /> LIVE TELEMETRY
        </span>
      </div>

      {/* Scrolling Stream Marquee */}
      <div className="overflow-hidden flex-1 relative">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pl-4">
          {TICKER_EVENTS.concat(TICKER_EVENTS).map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="flex items-center gap-2.5 text-xs font-mono group cursor-pointer transition-colors"
            >
              <span
                className={`px-2 py-0.5 rounded-md border text-[9px] font-bold tracking-wider ${event.tagColor}`}
              >
                {event.tag}
              </span>
              <span className="text-slate-300 group-hover:text-white transition-colors">
                {event.text}
              </span>
              <span className="text-[10px] text-neutral-500">{event.time}</span>
              <span className="text-neutral-700 select-none">///</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
