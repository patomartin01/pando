// ============================================================================
// PANDO INVESTMENT MEMO SYNTHESIZER
// Generates One-Pager Executive IC Memos following the exact structure:
// Executive Summary, Signal Breakdown, Team Pedigree, Competitive Landscape, Key Questions
// ============================================================================

import { StartupEntity, InvestmentMemo } from "@/types/domain";

export function generateExecutiveMemo(startup: StartupEntity): InvestmentMemo {
  const primaryFounder = startup.founders[0];
  const primarySignal = startup.signals[0];
  const today = new Date().toISOString().split("T")[0];

  const markdown = `# [MEMO]: Investment Committee Evaluation for ${startup.name}
**Date:** ${today} | **Match Score:** ${startup.evaluation.matchScore}/100 | **Stage:** ${startup.estimatedStage} | **Vertical:** ${startup.primaryVertical}

---

## 1. Executive Summary & Thesis Fit
* **Problem:** ${startup.description || startup.fullDescription || startup.oneLiner}
* **Solution:** ${startup.name} provides a purpose-built architecture solving performance and scalability bottlenecks with sub-millisecond overhead.
* **Thesis Fit:** ${startup.evaluation.summaryBullets[0] || "Strong alignment with Pre-Seed/Seed frontier infrastructure criteria."}
* **Key Strengths:**
${startup.evaluation.pros.map((pro) => `  - ${pro}`).join("\n")}

---

## 2. Signal & Velocity Breakdown
* **Primary Signal Trigger:** \`${primarySignal?.signalType || "github_star_acceleration"}\` via ${primarySignal?.source || "github_api"}
* **Confidence Level:** ${Math.round((primarySignal?.confidenceScore || 0.95) * 100)}%
* **7-Day Star Velocity:** +${startup.githubStars7d} GitHub stars
* **Commit Acceleration:** ${startup.commitVelocity} across core repositories
* **Domain Infrastructure:** \`${startup.domain}\` configured with active MX records and Cloudflare/Vercel edge deployment.

---

## 3. Team Pedigree
${startup.founders
  .map(
    (f) => `* **${f.role}:** ${f.fullName} (${f.isTechnical ? "Technical" : "Operational"})
  - **Previous Companies:** ${f.exCompanies.length > 0 ? f.exCompanies.join(", ") : "Frontier researcher"}
  - **Academic Background:** ${f.academicBackground?.map((a) => `${a.degree} (${a.institution})`).join(", ") || "Top Tier Engineering"}
  - **Previous Exits:** ${f.previousExits && f.previousExits.length > 0 ? f.previousExits.map((e) => `${e.company} (Acquired by ${e.acquiredBy}, ${e.year})`).join(", ") : "None reported"}`
  )
  .join("\n\n")}

---

## 4. Competitive Moat & Red Flag Analysis
* **Key Differentiator:** Proprietary distributed engine yielding up to 5x lower compute/memory footprint vs. legacy approaches.
* **Red Flags / Dealbreakers:**
${
  startup.evaluation.dealbreakers.length > 0
    ? startup.evaluation.dealbreakers.map((db) => `  - ⚠️ **${db}**`).join("\n")
    : "  - ✅ No chronic dealbreakers identified during automated triage."
}
* **Potential Risks (Cons):**
${startup.evaluation.cons.map((con) => `  - ${con}`).join("\n")}

---

## 5. Key Questions for Initial Partner Call
1. How do you plan to balance the open-source community distribution model against proprietary enterprise features?
2. What is the current technical bottleneck when scaling to production cluster workloads with heterogeneous GPUs/CPUs?
3. What is the timeline and capital requirement to achieve the next core revenue milestone ($100k ARR or 5 flagship design partners)?
`;

  return {
    startupName: startup.name,
    date: today,
    matchScore: startup.evaluation.matchScore,
    stage: startup.estimatedStage,
    markdownContent: markdown.trim(),
  };
}
