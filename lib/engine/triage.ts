// ============================================================================
// PANDO ANTI-NOISE TRIAGE & GUARDRAILS ENGINE
// Rejects false positives before triggering costly enrichment scraping APIs
// ============================================================================

export interface TriageResult {
  isRejected: boolean;
  rejectionReason?: string;
  category?: "ACADEMIC_TUTORIAL" | "PERSONAL_PROJECT" | "AGENCY_SOFTWARE_HOUSE" | "SPAM_FORK" | "VALID_STARTUP";
}

const ACADEMIC_KEYWORDS = [
  "course",
  "homework",
  "tutorial",
  "leetcode",
  "awesome-list",
  "awesome-",
  "bootcamp",
  "cs106",
  "cs229",
  "cs231n",
  "assignment",
  "lecture-notes",
  "cheat-sheet",
  "interview-prep",
];

const PERSONAL_KEYWORDS = [
  "dotfiles",
  "my-config",
  "personal-blog",
  "vim-config",
  "zshrc",
  "resume",
  "portfolio",
  "test-repo",
  "sandbox",
];

const AGENCY_KEYWORDS = [
  "software agency",
  "custom software development",
  "hourly rate",
  "development shop",
  "staff augmentation",
  "we build websites for clients",
  "digital studio",
  "outsourcing",
];

export function runAntiNoiseTriage(payload: {
  title?: string;
  description?: string;
  readme?: string;
  isFork?: boolean;
  forkParentStars?: number;
}): TriageResult {
  const content = `${payload.title || ""} ${payload.description || ""} ${payload.readme || ""}`.toLowerCase();

  // 1. Repositorio Académico / Curso / Tutorial
  if (ACADEMIC_KEYWORDS.some((kw) => content.includes(kw))) {
    return {
      isRejected: true,
      category: "ACADEMIC_TUTORIAL",
      rejectionReason: "Title/Readme contains academic, tutorial, or course keywords.",
    };
  }

  // 2. Proyecto Personal / Sin Ánimo de Lucro
  if (PERSONAL_KEYWORDS.some((kw) => content.includes(kw))) {
    return {
      isRejected: true,
      category: "PERSONAL_PROJECT",
      rejectionReason: "Detected personal dotfiles, config repository, or non-commercial sandbox.",
    };
  }

  // 3. Agencia / Software House
  if (AGENCY_KEYWORDS.some((kw) => content.includes(kw))) {
    return {
      isRejected: true,
      category: "AGENCY_SOFTWARE_HOUSE",
      rejectionReason: "Entity identifies as custom dev agency or outsourcing vendor rather than product SaaS/Infra.",
    };
  }

  // 4. Spam / Fork Masivo
  if (payload.isFork && (payload.forkParentStars || 0) > 100) {
    return {
      isRejected: true,
      category: "SPAM_FORK",
      rejectionReason: "Direct fork of high-star upstream repo without independent architectural novelty.",
    };
  }

  return {
    isRejected: false,
    category: "VALID_STARTUP",
  };
}
