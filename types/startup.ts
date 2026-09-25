export type SignalSource = "github_velocity" | "yc_directory" | "product_hunt" | "stealth_domain" | "hiring_spike" | "sec_filing";

export type PipelineStage = "sourced" | "root_enriched" | "thesis_matched" | "partner_review" | "term_sheet" | "invested" | "passed";

export interface Founder {
  name: string;
  role: string;
  avatar: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  previousCompany?: string;
}

export interface MetricSignal {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface ThesisAlignment {
  score: number; // 0 to 100
  recommendation: "High Alignment" | "Watchlist" | "Low Alignment" | "Pass";
  pros: string[];
  cons: string[];
  keyQuestions: string[];
}

export interface StartupDeal {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  website: string;
  source: SignalSource;
  stage: PipelineStage;
  sector: string;
  location: string;
  foundedYear: string;
  employees: string;
  fundingTarget?: string;
  techStack: string[];
  description: string;
  discoveredAt: string;
  founders: Founder[];
  metrics: MetricSignal[];
  thesisMatch: ThesisAlignment;
  githubStars?: number;
  githubStarGrowth28d?: number;
  productHuntUpvotes?: number;
  growthScore: number; // 0 to 100
  memoMarkdown?: string;
}

export interface VCThesisConfig {
  fundName: string;
  fundStage: string;
  ticketSize: string;
  primarySectors: string[];
  targetGeographies: string[];
  minGrowthScore: number;
  weightings: {
    team: number;
    market: number;
    traction: number;
    techMoat: number;
  };
  excludedKeywords: string[];
}
