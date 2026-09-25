// ============================================================================
// PANDO DOMAIN MODEL & ENTITY DEFINITIONS
// Industrial Grade TypeScript Schemas (Harmonic.ai / Crustdata Architecture)
// Includes Time-Series, VC Pipeline Stages, RLHF Feedback & Team Overlap Graph
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

export type DealStage =
  | "NEW_SIGNAL"
  | "AI_QUALIFIED"
  | "SAVED_FOR_REVIEW"
  | "OUTREACH_PENDING"
  | "CONTACTED"
  | "PASSED"
  | "INVESTED";

export interface TeamOverlap {
  coFounderName: string;
  previousCompany: string;
  yearsOverlapped: number;
}

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
  teamOverlapMatrix?: TeamOverlap[];
}

export interface MetricTimeSeriesPoint {
  id?: number;
  metricType: "github_stars" | "linkedin_headcount" | "engineering_headcount" | "web_traffic";
  value: number;
  recordedAt: string;
}

export interface FeedbackLog {
  id: string;
  startupId: string;
  evaluationId?: string;
  userAction: "ACCEPTED" | "REJECTED" | "FALSE_POSITIVE";
  rejectionReason?: "Too early" | "Market too small" | "Not technical team" | "Out of thesis" | string;
  userNotes?: string;
  createdAt: string;
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
    teamPedigree: number;
    technicalVelocity: number;
    thesisVectorFit: number;
    earlyTraction: number;
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

  // VC Workflow Pipeline Status
  pipelineStatus: DealStage;

  // Joined / Enriched Aggregations
  founders: Founder[];
  signals: Signal[];
  evaluation: ThesisEvaluation;
  timeSeries: {
    githubStars: { day: string; value: number }[];
    linkedinHeadcount: { day: string; value: number }[];
    engineeringHeadcount: { day: string; value: number }[];
    webTraffic: { day: string; value: number }[];
  };

  // Real-time Velocity Telemetry (Computed)
  githubStars7d: number;
  commitVelocity: string;
  founderPedigree: string[];
  hasRedFlags: boolean;
  feedbackHistory?: FeedbackLog[];
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
