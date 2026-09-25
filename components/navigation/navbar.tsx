"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Network, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Github, 
  Activity, 
  TrendingUp, 
  FolderGit2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommandMenu: () => void;
  dealCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandMenu, dealCount }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Deal Pipeline", href: "/", icon: Activity },
    { name: "Thesis Engine", href: "/thesis", icon: SlidersHorizontal },
    { name: "Investment Memos", href: "/memos", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pando-border bg-pando-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-violet-500/20 p-0.5 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-all duration-300 shadow-glow">
              <Network className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  PANDO
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  VC AI v1.0
                </span>
              </div>
              <p className="text-[10px] text-pando-muted font-mono tracking-wide">
                Underground Deal Network
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-pando-hover text-white border border-pando-border shadow-sm"
                      : "text-pando-muted hover:text-white hover:bg-pando-hover/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-pando-muted")} />
                  <span>{item.name}</span>
                  {item.href === "/" && (
                    <span className="ml-1 rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                      {dealCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Command Bar Button */}
          <button
            onClick={onOpenCommandMenu}
            className="flex items-center gap-3 rounded-xl border border-pando-border bg-pando-card/90 px-3.5 py-2 text-xs text-pando-muted hover:border-emerald-500/40 hover:text-white transition-all shadow-sm group"
          >
            <Search className="h-3.5 w-3.5 text-pando-muted group-hover:text-emerald-400 transition-colors" />
            <span className="hidden sm:inline">Search deal network or run AI...</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-pando-border/60 px-1.5 py-0.5 font-mono text-[10px] text-pando-muted">
              <span>⌘</span>K
            </kbd>
          </button>

          {/* Live Network Pulse Indicator */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] font-medium">Scrapers Active</span>
          </div>

          {/* GitHub Repo Link Badge */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-pando-border bg-pando-card px-3 py-2 text-xs font-medium text-white hover:bg-pando-hover hover:border-pando-border transition-all"
          >
            <FolderGit2 className="h-3.5 w-3.5 text-pando-emerald" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
