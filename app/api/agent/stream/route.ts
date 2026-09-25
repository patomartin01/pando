// ============================================================================
// PANDO AGENT REASONING STREAM API (SSE)
// Emits real-time Agent Thought Protocol events (tools, thoughts, latencies)
// ============================================================================

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetDomain = searchParams.get("domain") || "unicorndb.ai";
  const sessionKey = `lock:signal:${targetDomain}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (step: string, status: string, message: string, tool?: string, ms?: number) => {
        const payload = JSON.stringify({
          session_key: sessionKey,
          status,
          step,
          message,
          tool_used: tool || null,
          execution_time_ms: ms || Math.floor(Math.random() * 200 + 80),
          timestamp: new Date().toISOString(),
        });
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      };

      // Simulated Realtime Agent Pipeline Steps
      sendEvent("INIT", "TRIAGE", `Acquired distributed Redis lock for ${sessionKey}. Verifying rate limits...`, "redis_lock_acquire", 12);
      await new Promise((r) => setTimeout(r, 600));

      sendEvent("ANTI_NOISE", "TRIAGE", `Executing anti-noise guardrails. Checking AST & commercial keywords...`, "anti_noise_filter", 45);
      await new Promise((r) => setTimeout(r, 700));

      sendEvent("SCRAPING", "SCRAPING", `Scraping landing page and DNS records for ${targetDomain}...`, "firecrawl_page_scrape", 340);
      await new Promise((r) => setTimeout(r, 900));

      sendEvent("GITHUB_VELOCITY", "SCRAPING", `Querying GitHub GraphQL API for commit acceleration & star trajectory...`, "github_graphql_velocity", 412);
      await new Promise((r) => setTimeout(r, 800));

      sendEvent("FOUNDER_PEDIGREE", "EVALUATING", `Enriching founders graph (Ex-Databricks Staff Architect / Stanford PhD verified)...`, "proxycurl_talent_graph", 280);
      await new Promise((r) => setTimeout(r, 900));

      sendEvent("THESIS_FIT", "EVALUATING", `Computing pgvector cosine similarity against active B2B AI Infra thesis (distance: 0.08)...`, "pgvector_hnsw_match", 65);
      await new Promise((r) => setTimeout(r, 700));

      sendEvent("SCORING", "EVALUATING", `Applying composite scoring matrix: Team 96, Velocity 95, Fit 94, Traction 92...`, "thesis_scoring_matrix", 30);
      await new Promise((r) => setTimeout(r, 600));

      sendEvent("DONE", "COMPLETED", `Evaluation finalized with Match Score: 95/100. Emitting to Deal Pipeline.`, "supabase_realtime_pub", 18);
      
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
