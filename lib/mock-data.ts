import { StartupDeal, VCThesisConfig } from "@/types/startup";

export const initialThesisConfig: VCThesisConfig = {
  fundName: "Pando Ventures",
  fundStage: "Pre-Seed to Series A",
  ticketSize: "$250K - $1.5M",
  primarySectors: ["AI Infrastructure", "B2B SaaS", "Developer Tools", "Fintech LATAM", "Cybersecurity"],
  targetGeographies: ["United States", "LATAM", "Europe", "Remote"],
  minGrowthScore: 75,
  weightings: {
    team: 35,
    market: 25,
    traction: 25,
    techMoat: 15,
  },
  excludedKeywords: ["B2C e-commerce", "Crypto MLM", "Gambling", "Hardware only"],
};

export const mockStartups: StartupDeal[] = [
  {
    id: "pando-001",
    name: "CortexDB",
    tagline: "Ultra-low latency vector database written in Rust for real-time AI agents",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    website: "https://cortexdb.io",
    source: "github_velocity",
    stage: "thesis_matched",
    sector: "AI Infrastructure",
    location: "San Francisco, CA",
    foundedYear: "2025",
    employees: "4 founders",
    fundingTarget: "$1.2M Pre-Seed",
    techStack: ["Rust", "C++", "SIMD", "gRPC", "Python SDK"],
    description: "CortexDB is a specialized, zero-copy vector search index designed for multi-agent systems requiring sub-millisecond context retrieval at massive scale. Built by ex-Databricks and ex-SingleStore core engineers.",
    discoveredAt: "2 hours ago",
    githubStars: 4850,
    githubStarGrowth28d: 340, // +340% in 28 days
    growthScore: 96,
    founders: [
      {
        name: "Alexey Volkov",
        role: "Co-Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-Staff Engineer @ Databricks",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://x.com",
      },
      {
        name: "Elena Rostova",
        role: "Co-Founder & CTO",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-Principal Architect @ SingleStore",
        linkedinUrl: "https://linkedin.com",
      },
    ],
    metrics: [
      { label: "GitHub Stars", value: "4,850", change: "+340% (28d)", trend: "up" },
      { label: "Active Contributors", value: "38", change: "+12 this week", trend: "up" },
      { label: "Benchmark Latency", value: "0.82 ms", change: "4x faster vs Pinecone", trend: "up" },
      { label: "Discord Devs", value: "1,420", change: "+480 this month", trend: "up" },
    ],
    thesisMatch: {
      score: 97,
      recommendation: "High Alignment",
      pros: [
        "World-class technical team with deep systems engineering background from Databricks.",
        "Massive organic GitHub growth (+340% in last 28 days).",
        "Directly addresses critical bottleneck in LLM multi-agent latency.",
      ],
      cons: [
        "High competition in vector database space (Qdrant, Pinecone, Chroma).",
        "Open-source monetization strategy requires careful cloud managed service execution.",
      ],
      keyQuestions: [
        "What is the current latency comparison under high write concurrency?",
        "Are any major AI lab frameworks (e.g. LangChain, LlamaIndex) integrating CortexDB natively?",
      ],
    },
    memoMarkdown: `# Investment Memo: CortexDB

## Executive Summary
CortexDB is building a ultra-high-performance vector database natively optimized for real-time multi-agent LLM workflows. In the last 28 days, their GitHub repository has exploded from 1,100 to 4,850 stars, driven entirely by organic adoption in the AI agent developer community.

## Market Opportunity (TAM)
The global AI infrastructure and database market is projected to reach $38B by 2028. As autonomous AI agents transition from batch workflows to real-time interactive loops, vector query latency under 1ms becomes a hard requirement.

## Team
- **Alexey Volkov (CEO)**: Led distributed storage query execution at Databricks for 5 years.
- **Elena Rostova (CTO)**: Architected SIMD-accelerated memory indices at SingleStore.

## Investment Recommendation
**STRONG BUY / FAST-TRACK TO PARTNER MEETING**. Ticket size $500K in $1.2M Pre-Seed round.`,
  },

  {
    id: "pando-002",
    name: "Kipu Health",
    tagline: "AI-driven autonomous revenue cycle management for LatAm hospital networks",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80",
    website: "https://kipuhealth.ai",
    source: "yc_directory",
    stage: "partner_review",
    sector: "Fintech LATAM",
    location: "Mexico City / Bogota",
    foundedYear: "2025",
    employees: "12 team members",
    fundingTarget: "$2.0M Seed",
    techStack: ["Next.js", "Python", "OCR Vision LLMs", "PostgreSQL", "FastAPI"],
    description: "Kipu automates medical claim processing and health insurance reimbursements across Mexico and Colombia. By combining medical record NLP vision models with local clearinghouse APIs, Kipu reduces claim denial rates from 28% to under 2.1%.",
    discoveredAt: "5 hours ago",
    growthScore: 92,
    founders: [
      {
        name: "Mateo Silva",
        role: "Co-Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-Product Lead @ Rappi Pay",
      },
      {
        name: "Dr. Sofia Morales",
        role: "Co-Founder & Chief Medical Officer",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-Director @ Hospital Angeles",
      },
    ],
    metrics: [
      { label: "ARR (Annual Run Rate)", value: "$420K", change: "+35% MoM", trend: "up" },
      { label: "Processed Claims", value: "$18.4M", change: "Last 90 days", trend: "up" },
      { label: "Hospital Partners", value: "14 networks", change: "+4 in August", trend: "up" },
      { label: "Net Revenue Retention", value: "142%", change: "Zero churn", trend: "up" },
    ],
    thesisMatch: {
      score: 94,
      recommendation: "High Alignment",
      pros: [
        "Incredible early monetization ($420K ARR growing 35% MoM).",
        "Uniquely strong founder-market fit combining Fintech (Rappi) and Healthcare leadership.",
        "Monopolistic data moat in LATAM hospital-insurer integration layer.",
      ],
      cons: [
        "Long sales cycles when expanding into tier-1 enterprise hospital chains.",
        "Regulatory nuances between Mexican insurance laws and Colombian EPS systems.",
      ],
      keyQuestions: [
        "What is the average payback period per enterprise hospital onboarded?",
        "How easily can the OCR pipeline adapt to hand-written doctor notes across different LATAM regions?",
      ],
    },
    memoMarkdown: `# Investment Memo: Kipu Health

## Executive Summary
Kipu Health is automating healthcare billing and insurance collections across Latin America. With 14 hospital networks onboarded and $420K ARR, Kipu is executing at top 1% speed for a seed-stage LATAM fintech.

## Revenue & Traction
- **ARR**: $420,000 (35% MoM growth)
- **Gross Margin**: 78%
- **NRR**: 142%`,
  },

  {
    id: "pando-003",
    name: "Vigilant AI",
    tagline: "Continuous agentic security posture for cloud-native Kubernetes workloads",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80",
    website: "https://vigilantsec.ai",
    source: "product_hunt",
    stage: "root_enriched",
    sector: "Cybersecurity",
    location: "New York, NY",
    foundedYear: "2025",
    employees: "6 team members",
    fundingTarget: "$1.5M Seed",
    techStack: ["Go", "eBPF", "TypeScript", "Anthropic Claude", "Kubernetes"],
    description: "Vigilant deploys lightweight eBPF kernel agents that autonomously intercept lateral network attacks, simulate exploit paths, and auto-patch infrastructure vulnerabilities before human SecOps teams even see an alert.",
    discoveredAt: "12 hours ago",
    productHuntUpvotes: 1840,
    growthScore: 89,
    founders: [
      {
        name: "David Chen",
        role: "Co-Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-Head of Offense @ CrowdStrike",
      },
    ],
    metrics: [
      { label: "ProductHunt Rank", value: "#1 Product of the Day", change: "1,840 upvotes", trend: "up" },
      { label: "Active Clusters Guarded", value: "620", change: "+110 this week", trend: "up" },
      { label: "Auto-Remediated Incidents", value: "4,150", change: "99.4% accuracy", trend: "up" },
    ],
    thesisMatch: {
      score: 88,
      recommendation: "High Alignment",
      pros: [
        "Deep technical moat utilizing eBPF kernel-level tracing paired with autonomous AI reasoning.",
        "#1 Product Hunt launch creating massive organic inbound top of funnel.",
        "Founder led offensive security teams at CrowdStrike.",
      ],
      cons: [
        "Security buyers are risk-averse regarding autonomous auto-patching in production environments.",
      ],
      keyQuestions: [
        "How does Vigilant handle false positive safeguards when performing automated firewall rollbacks?",
      ],
    },
  },

  {
    id: "pando-004",
    name: "Synapse Logic",
    tagline: "Synthetic data generation platform for training physical robotics & spatial AI models",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&auto=format&fit=crop&q=80",
    website: "https://synapselogic.dev",
    source: "stealth_domain",
    stage: "sourced",
    sector: "AI Infrastructure",
    location: "Zurich / Remote",
    foundedYear: "2025",
    employees: "3 founders",
    fundingTarget: "$800K Pre-Seed",
    techStack: ["PyTorch", "Unreal Engine 5", "CUDA", "USD", "Python"],
    description: "Synapse Logic generates physically accurate, multi-modal sensor telemetry (LiDAR, RGB-D, Thermal) in photorealistic virtual environments to train humanoid robots 100x faster than real-world data collection.",
    discoveredAt: "1 day ago",
    growthScore: 84,
    founders: [
      {
        name: "Dr. Lukas Weber",
        role: "Co-Founder",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-ETH Zurich AI Robotics Lab",
      },
    ],
    metrics: [
      { label: "Stealth Domain Signal", value: "synapselogic.dev", change: "Registered 14 days ago", trend: "neutral" },
      { label: "Hiring Signal", value: "3 Senior CUDA roles open", change: "Ashby board active", trend: "up" },
    ],
    thesisMatch: {
      score: 82,
      recommendation: "Watchlist",
      pros: [
        "Extremely high moat at the intersection of spatial computing, synthetic physics simulation and robotics AI.",
        "ETH Zurich spinout talent.",
      ],
      cons: [
        "Early pre-revenue stage, hardware simulation sales cycles can be unpredictable.",
      ],
      keyQuestions: [
        "Who are their first pilot customers among humanoid robotics manufacturers?",
      ],
    },
  },

  {
    id: "pando-005",
    name: "PayFlow Latam",
    tagline: "Automated treasury management & cross-border FX hedging for enterprise exporters in LATAM",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80",
    website: "https://payflow.la",
    source: "hiring_spike",
    stage: "term_sheet",
    sector: "Fintech LATAM",
    location: "Sao Paulo / Buenos Aires",
    foundedYear: "2024",
    employees: "22 team members",
    fundingTarget: "$3.5M Series A",
    techStack: ["Go", "React", "AWS", "Plaid API", "Stripe Connect"],
    description: "PayFlow helps LATAM enterprise agricultural and tech exporters manage currency volatility between MXN, BRL, ARS and USD with automated smart contracts and programmatic hedging.",
    discoveredAt: "3 days ago",
    growthScore: 95,
    founders: [
      {
        name: "Rodrigo Mendonça",
        role: "CEO",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        previousCompany: "Ex-VP Trading @ Itaú BBA",
      },
    ],
    metrics: [
      { label: "Annualized TPV", value: "$120M", change: "+210% YoY", trend: "up" },
      { label: "Net Margin", value: "1.4% on FX", change: "$1.68M ARR", trend: "up" },
    ],
    thesisMatch: {
      score: 95,
      recommendation: "High Alignment",
      pros: [
        "High revenue scale ($1.68M ARR) with clear moat in complex cross-border regulatory licensing.",
        "Founders were senior FX traders at Itaú BBA.",
      ],
      cons: [
        "Higher capital requirements and regulatory compliance oversight.",
      ],
      keyQuestions: [
        "What is the current credit risk exposure on defaulted forward contracts?",
      ],
    },
  },
];
