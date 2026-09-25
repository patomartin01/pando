// ============================================================================
// PANDO THESIS MATCH & COMPOSITE SCORING ENGINE
// Mathematical formulation matching technical specification:
// Final Score = 0 if any Hard Filter fails, else SUM(Wi * Si)
// ============================================================================

import { StartupEntity, ThesisParameters, ThesisEvaluation } from "@/types/domain";

export interface DynamicWeights {
  teamPedigree: number;
  technicalVelocity: number;
  thesisVectorFit: number;
  earlyTraction: number;
}

/**
 * Validates strict hard filters against startup profile
 */
export function evaluateHardFilters(
  startup: Partial<StartupEntity>,
  thesis: ThesisParameters
): { passed: boolean; failedFilters: string[] } {
  const failedFilters: string[] = [];

  // 1. Allowed Geographies
  if (
    startup.countryCode &&
    !thesis.hardFilters.allowedGeographies.includes(startup.countryCode)
  ) {
    failedFilters.push(
      `Geography '${startup.countryCode}' not in allowed list [${thesis.hardFilters.allowedGeographies.join(", ")}]`
    );
  }

  // 2. Excluded Verticals
  if (
    startup.primaryVertical &&
    thesis.hardFilters.excludedVerticals.some((v) =>
      startup.primaryVertical?.toLowerCase().includes(v.toLowerCase())
    )
  ) {
    failedFilters.push(`Vertical '${startup.primaryVertical}' is in excluded list`);
  }

  // 3. Technical Founder Requirement
  if (thesis.hardFilters.requireTechnicalFounder) {
    const hasTechFounder = startup.founders?.some((f) => f.isTechnical);
    if (!hasTechFounder) {
      failedFilters.push("Missing technical co-founder");
    }
  }

  return {
    passed: failedFilters.length === 0,
    failedFilters,
  };
}

/**
 * Computes the composite score dynamically based on sub-scores and weights
 */
export function calculateCompositeScore(
  scores: {
    teamPedigree: number;
    technicalVelocity: number;
    thesisVectorFit: number;
    earlyTraction: number;
  },
  weights: DynamicWeights,
  passedHardFilters: boolean
): number {
  if (!passedHardFilters) {
    return 0;
  }

  const totalWeight =
    weights.teamPedigree +
    weights.technicalVelocity +
    weights.thesisVectorFit +
    weights.earlyTraction;

  if (totalWeight <= 0) return 0;

  const normalizedW = {
    team: weights.teamPedigree / totalWeight,
    velocity: weights.technicalVelocity / totalWeight,
    fit: weights.thesisVectorFit / totalWeight,
    traction: weights.earlyTraction / totalWeight,
  };

  const finalScore =
    scores.teamPedigree * normalizedW.team +
    scores.technicalVelocity * normalizedW.velocity +
    scores.thesisVectorFit * normalizedW.fit +
    scores.earlyTraction * normalizedW.traction;

  return Math.round(Math.min(100, Math.max(0, finalScore)));
}

/**
 * Recalculates all startup evaluations given updated client-side slider weights
 */
export function recomputeStartupBatch(
  startups: StartupEntity[],
  newWeights: DynamicWeights
): StartupEntity[] {
  return startups.map((startup) => {
    const oldEval = startup.evaluation;
    const newScore = calculateCompositeScore(
      oldEval.scoreBreakdown,
      newWeights,
      oldEval.passedHardFilters
    );

    return {
      ...startup,
      evaluation: {
        ...oldEval,
        matchScore: newScore,
      },
    };
  });
}
