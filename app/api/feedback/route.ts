// ============================================================================
// PANDO RLHF FEEDBACK & DEAL STAGE API ROUTE
// Stores VC Partner actions to inject into few-shot prompts and update pipeline
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { FeedbackLog, DealStage } from "@/types/domain";

// In-memory feedback store for session (backed by Postgres table feedback_logs in prod)
export const globalFeedbackStore: FeedbackLog[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startupId, evaluationId, userAction, rejectionReason, userNotes, nextStage } = body;

    const log: FeedbackLog = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      startupId,
      evaluationId,
      userAction, // 'ACCEPTED' | 'REJECTED' | 'FALSE_POSITIVE'
      rejectionReason,
      userNotes,
      createdAt: new Date().toISOString(),
    };

    globalFeedbackStore.push(log);

    return NextResponse.json({
      success: true,
      log,
      updatedStage: nextStage || (userAction === "ACCEPTED" ? "OUTREACH_PENDING" : "PASSED"),
      message: `Feedback recorded: [${userAction}] ${rejectionReason ? `(${rejectionReason})` : ""}. Injected into LLM few-shot context.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
