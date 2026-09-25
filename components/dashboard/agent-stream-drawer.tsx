"use client";

import React from "react";
import { Terminal, Cpu, CheckCircle2, Loader2, X, Clock, Layers, ShieldCheck } from "lucide-react";
import { useAgentLiveStream } from "@/hooks/useAgentLiveStream";
import { StartupEntity } from "@/types/domain";

interface AgentStreamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  startup: StartupEntity | null;
}

export function AgentStreamDrawer({ isOpen, onClose, startup }: AgentStreamDrawerProps) {
  const sessionKey = startup ? startup.domain : "unicorndb.ai";
  const { logs, currentStatus, isStreaming } = useAgentLiveStream(sessionKey, isOpen);

  if (!isOpen || !startup) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <aside className="relative w-full max-w-xl glass-panel border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold text-white tracking-wide">
                  AGENT_REASONING_TRACE
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Target: {startup.name} ({startup.domain})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Badge & Metrics */}
          <div className="my-4 flex items-center justify-between bg-black/50 p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">PIPELINE:</span>
              <span className="text-xs font-mono text-neutral-200">{sessionKey}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {isStreaming ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                  <span className="text-violet-400 font-bold">{currentStatus}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COMPLETED</span>
                </>
              )}
            </div>
          </div>

          {/* Console Log Output */}
          <div className="font-mono text-xs space-y-2.5 overflow-y-auto max-h-[calc(100vh-280px)] pr-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
                      {log.status}
                    </span>
                    {log.toolUsed && (
                      <span className="text-neutral-400">
                        tool: <code className="text-emerald-400">{log.toolUsed}</code>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.executionTimeMs}ms
                  </span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-[11px]">{log.message}</p>
              </div>
            ))}

            {logs.length === 0 && (
              <div className="text-center py-12 text-neutral-500 text-xs font-mono">
                Iniciando handshake y adquisición de candado distribuido...
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-500 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Model: Claude-3.5-Sonnet + GPT-4o</span>
          </div>
          <span>Latency: ~240ms | HNSW Cosine Index</span>
        </div>
      </aside>
    </div>
  );
}
