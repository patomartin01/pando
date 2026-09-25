// ============================================================================
// PANDO DOMAIN MODEL & ENTITY DEFINITIONS
// Industrial Grade TypeScript Schemas (Harmonic.ai / Crustdata Architecture)
// ============================================================================

export type SignalType =
  | "github_star_acceleration"
  | "commit_velocity_spike"
  | "stealth_domain_registration"
  | "key_talent_departure"
  | "package_release_burst"
  | "community_hype_spike";

export type SignalSource =
  | "github_api"
  | "whois_monitor"
  | "linkedin_scraper"
  | "npm_registry"
  | "hackernews_api";

export interface Founder {
  id: string;
  startupId?: string;
  fullName: string;
  linkedinUrl?: string;
  githubHandle?: string;
  role: string;
  exCompanies: string[];
  previousExits?: { company: string; acquiredBy: string; year: number }[];
  isTechnical: boolean;
  academicBackground?: { degree: string; institution: string }[];
  avatarUrl?: string;
  pedigreeScore?: number; // 0-100
}

export interface Signal {
  id: string;
  startupId: string;
  signalType: SignalType;
  source: SignalSource;
  confidenceScore: number; // 0.00 - 1.00
  rawPayload: Record<string, any>;
  extractedMetrics: {
    stars7d?: number;
    starsGrowthRate?: string;
    commitVelocityIncrease?: string;
    commitCount14d?: number;
    activeContributors?: number;
    domainName?: string;
    registrationDate?: string;
    upvoteVelocity?: number;
    authorKarma?: number;
  };
  detectedAt: string;
}

export interface ThesisParameters {
  id: string;
  name: string;
  thesisText: string;
  hardFilters: {
    allowedGeographies: string[];
    excludedVerticals: string[];
    maxCompanyAgeMonths: number;
    requireTechnicalFounder: boolean;
  };
  scoringWeights: {
    teamPedigree: number;      // e.g. 0.35
    technicalVelocity: number; // e.g. 0.30
    thesisVectorFit: number;   // e.g. 0.20
    earlyTraction: number;     // e.g. 0.15
  };
  isActive: boolean;
  createdAt?: string;
}

export interface ThesisEvaluation {
  id: string;
  startupId: string;
  thesisId: string;
  matchScore: number; // 0-100
  vectorDistance?: number;
  passedHardFilters: boolean;
  failedFilters?: string[];
  scoreBreakdown: {
    teamPedigree: number;
    technicalVelocity: number;
    thesisVectorFit: number;
    earlyTraction: number;
  };
  summaryBullets: [string, string, string]; // exactly 3 bullets
  pros: string[];
  cons: string[];
  dealbreakers: string[];
  agentReasoningTrace: string;
  evaluatedAt: string;
}

export interface StartupEntity {
  id: string;
  name: string;
  domain: string;
  stealthStatus: boolean;
  oneLiner: string;
  fullDescription: string;
  primaryVertical: string;
  countryCode: string;
  estimatedStage: string;
  websiteUrl: string;
  githubOrgUrl?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;

  // Joined / Enriched Aggregations
  founders: Founder[];
  signals: Signal[];
  evaluation: ThesisEvaluation;

  // Real-time Velocity Telemetry (Computed)
  githubStars7d: number;
  commitVelocity: string;
  founderPedigree: string[];
  hasRedFlags: boolean;
  pipelineStage?: "sourced" | "root_enriched" | "thesis_matched" | "ic_review" | "term_sheet";
}

export interface AgentLiveLog {
  id: number;
  sessionKey: string;
  status: "TRIAGE" | "SCRAPING" | "EVALUATING" | "COMPLETED" | "FAILED";
  message: string;
  toolUsed?: string;
  executionTimeMs?: number;
  timestamp: string;
}

export interface OutreachDraft {
  startupName: string;
  recipientName: string;
  recipientEmail?: string;
  subjectLine: string;
  emailBody: string;
  signalHookUsed: string;
  suggestedFollowUpDays: number;
  personalizationPoints: string[];
}

export interface InvestmentMemo {
  startupName: string;
  date: string;
  matchScore: number;
  stage: string;
  markdownContent: string;
}
