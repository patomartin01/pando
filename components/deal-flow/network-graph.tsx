"use client";

import React, { useRef, useEffect, useState } from "react";
import { StartupDeal } from "@/types/startup";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

interface NetworkGraphProps {
  startups: StartupDeal[];
  onSelectStartup: (startup: StartupDeal) => void;
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  color: string;
  deal: StartupDeal;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  startups,
  onSelectStartup,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = 420);

    // Color palette based on sector
    const getColor = (sector: string) => {
      if (sector.includes("AI")) return "#10B981"; // Emerald
      if (sector.includes("Fintech")) return "#06B6D4"; // Cyan
      if (sector.includes("Security")) return "#8B5CF6"; // Violet
      return "#F59E0B"; // Amber
    };

    // Create Nodes
    const nodes: Node[] = startups.map((deal, idx) => {
      const angle = (idx / startups.length) * Math.PI * 2;
      const distance = 120 + Math.random() * 80;
      return {
        id: deal.id,
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 12 + (deal.thesisMatch.score / 100) * 10,
        label: deal.name,
        color: getColor(deal.sector),
        deal,
      };
    });

    // Central Core Node ("PANDO ROOT")
    const centerNode = {
      x: width / 2,
      y: height / 2,
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.3)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Root Connections to Central Core
      nodes.forEach((node) => {
        // Move nodes gently
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 40 || node.x > width - 40) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;

        // Draw pulsing root tendril to center
        const gradient = ctx.createLinearGradient(centerNode.x, centerNode.y, node.x, node.y);
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
        gradient.addColorStop(1, `${node.color}33`);

        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.quadraticCurveTo(
          (centerNode.x + node.x) / 2 + Math.sin(Date.now() / 1000 + node.x) * 20,
          (centerNode.y + node.y) / 2 + Math.cos(Date.now() / 1000 + node.y) * 20,
          node.x,
          node.y
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw inter-node edges if close
        nodes.forEach((other) => {
          if (other.id !== node.id) {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(100, 116, 139, ${0.2 * (1 - dist / 140)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      // Draw Center Core Node
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#10B981";
      ctx.fill();

      // Label Center Core
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "#10B981";
      ctx.textAlign = "center";
      ctx.fillText("PANDO CORE", centerNode.x, centerNode.y + 36);

      // Draw Startup Nodes
      nodes.forEach((node) => {
        // Outer Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}1A`;
        ctx.fill();

        // Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0D111A";
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node Label & Match Score
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.fillStyle = "#F8FAFC";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);

        ctx.font = "10px monospace";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText(`${node.deal.thesisMatch.score}% Match`, node.x, node.y + node.radius + 26);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse hover detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const found = nodes.find((node) => {
        const dx = node.x - mx;
        const dy = node.y - my;
        return Math.sqrt(dx * dx + dy * dy) <= node.radius + 8;
      });

      setHoveredNode(found || null);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const found = nodes.find((node) => {
        const dx = node.x - mx;
        const dy = node.y - my;
        return Math.sqrt(dx * dx + dy * dy) <= node.radius + 8;
      });

      if (found) {
        onSelectStartup(found.deal);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [startups, onSelectStartup]);

  return (
    <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0B0F19] to-[#07090E] p-4 shadow-2xl overflow-hidden group">
      {/* Background glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Overlay */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-2xl">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
          Pando Root Neural Topology Canvas
        </span>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div 
          onClick={() => onSelectStartup(hoveredNode.deal)}
          className="absolute bottom-6 right-6 z-10 bg-pando-card/90 backdrop-blur-xl border border-emerald-500/50 p-4 rounded-2xl shadow-2xl max-w-xs animate-in fade-in zoom-in-95 cursor-pointer hover:border-emerald-400"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm text-white">{hoveredNode.deal.name}</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30">
              {hoveredNode.deal.thesisMatch.score}% Match
            </span>
          </div>
          <p className="text-xs text-pando-muted line-clamp-2 mb-2">{hoveredNode.deal.tagline}</p>
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 pt-2 border-t border-pando-border">
            <span>Click to inspect deal</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-[420px] rounded-2xl cursor-crosshair" />
    </div>
  );
};
