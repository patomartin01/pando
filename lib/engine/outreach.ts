// ============================================================================
// PANDO AGENTIC OUTREACH GENERATOR
// Generates cold outreach (<150 words) referenced directly to the detected signal
// Golden Rules: Zero fluff, direct signal hook, soft conversational CTA
// ============================================================================

import { StartupEntity, OutreachDraft } from "@/types/domain";

export function generatePersonalizedOutreach(startup: StartupEntity): OutreachDraft {
  const founder = startup.founders[0];
  const founderName = founder ? founder.fullName.split(" ")[0] : "Founder";
  const primarySignal = startup.signals[0];

  let signalHook = "";
  let subjectLine = "";

  if (primarySignal?.signalType === "github_star_acceleration") {
    const stars = primarySignal.extractedMetrics.stars7d || startup.githubStars7d;
    signalHook = `noticed ${startup.name} picked up +${stars} GitHub stars this week`;
    subjectLine = `${startup.name} / GitHub velocity spike (+${stars})`;
  } else if (primarySignal?.signalType === "commit_velocity_spike") {
    signalHook = `tracked the commit surge (${startup.commitVelocity}) on your core repos`;
    subjectLine = `${startup.name} codebase velocity surge`;
  } else if (primarySignal?.signalType === "stealth_domain_registration") {
    signalHook = `spotted ${startup.domain} setup and your recent stealth transition`;
    subjectLine = `quick note on ${startup.domain}`;
  } else {
    signalHook = `spotted ${startup.name}'s architecture for ${startup.primaryVertical}`;
    subjectLine = `${startup.name} + VC deal notes`;
  }

  const exCompanyHook = founder?.exCompanies?.[0]
    ? `Following your work since ${founder.exCompanies[0]}, `
    : "";

  const emailBody = `Hey ${founderName},

${exCompanyHook}I ${signalHook}. The architectural approach you're taking with ${startup.name} to solve ${startup.oneLiner.toLowerCase()} caught our attention immediately.

We back technical founders building frontier developer tools and AI infrastructure at Pre-Seed/Seed, and we've been deep in this specific bottleneck recently.

Would it make sense to grab a quick 15-min virtual coffee this week to trade notes on where you're taking the stack?

Best,
Patricio | Pando Capital
`;

  return {
    startupName: startup.name,
    recipientName: founder ? founder.fullName : "Founding Team",
    recipientEmail: founder?.githubHandle ? `${founder.githubHandle}@users.noreply.github.com` : `founders@${startup.domain}`,
    subjectLine,
    emailBody: emailBody.trim(),
    signalHookUsed: signalHook,
    suggestedFollowUpDays: 3,
    personalizationPoints: [
      founder?.exCompanies?.[0] ? `Ex-${founder.exCompanies[0]}` : "Founding track record",
      `Primary signal: ${primarySignal?.signalType || "Code Velocity Spike"}`,
      `${startup.primaryVertical} architectural thesis alignment`,
    ],
  };
}
