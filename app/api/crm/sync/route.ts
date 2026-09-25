// ============================================================================
// PANDO CRM SYNC API ROUTE (ATTIO & HUBSPOT)
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { enterpriseStartups } from "@/lib/data/enterprise-dataset";
import { exportToAttioCRM } from "@/lib/engine/crm";

export async function POST(request: NextRequest) {
  try {
    const { startupId } = await request.json();
    const startup = enterpriseStartups.find((s) => s.id === startupId) || enterpriseStartups[0];

    const result = await exportToAttioCRM(startup);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
