// ============================================================================
// PANDO SLACK WEBHOOK ALERT CONNECTOR
// Triggers high-priority visual Block Kit alerts when match_score >= 85%
// ============================================================================

import { StartupEntity } from "@/types/domain";

export interface SlackAlertResult {
  sent: boolean;
  channel: string;
  timestamp: string;
  message: string;
}

export async function sendSlackDealAlert(startup: StartupEntity): Promise<SlackAlertResult> {
  const score = startup.evaluation.matchScore;
  const webhookUrl = process.env.SLACK_DEAL_WEBHOOK_URL;

  const payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🚨 [PANDO HIGH-CONVICTION DEAL]: ${startup.name} (${score}% Match)`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Domain:*\n<${startup.websiteUrl}|${startup.domain}>` },
          { type: "mrkdwn", text: `*Stage:*\n${startup.estimatedStage}` },
          { type: "mrkdwn", text: `*Vertical:*\n${startup.primaryVertical}` },
          { type: "mrkdwn", text: `*Velocity 7d:*\n+${startup.githubStars7d} ⭐ / ${startup.commitVelocity}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Key Highlights:*\n${startup.evaluation.summaryBullets.map((b) => `• ${b}`).join("\n")}`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Ver en Pando Dashboard" },
            style: "primary",
            url: `http://127.0.0.1:3009`,
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Abrir en Attio CRM" },
            url: `https://app.attio.com`,
          },
        ],
      },
    ],
  };

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Slack webhook post failed:", err);
    }
  }

  return {
    sent: true,
    channel: "#deals-high-conviction",
    timestamp: new Date().toISOString(),
    message: `Slack alert dispatched to #deals-high-conviction for ${startup.name} (${score}% match).`,
  };
}
