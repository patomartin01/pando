// ============================================================================
// PANDO OUTREACH API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { enterpriseStartups } from "@/lib/data/enterprise-dataset";
import { generatePersonalizedOutreach } from "@/lib/engine/outreach";

export async function POST(request: NextRequest) {
  try {
    const { startupId } = await request.json();
    const startup = enterpriseStartups.find((s) => s.id === startupId) || enterpriseStartups[0];

    const draft = generatePersonalizedOutreach(startup);
    return NextResponse.json({ success: true, draft });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
