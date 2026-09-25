-- ============================================================================
-- PANDO: The Underground Root Network for Global Deal Flow
-- Database Schema: PostgreSQL 16 + pgvector
-- Harmonic.ai & Crustdata Industrial Grade Architecture
-- ============================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. STARTUPS: Perfil unificado del objetivo
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    stealth_status BOOLEAN DEFAULT true,
    one_liner TEXT,
    full_description TEXT,
    embedding vector(3072), -- text-embedding-3-large
    primary_vertical VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'US',
    estimated_stage VARCHAR(50) DEFAULT 'Stealth / Pre-Seed',
    website_url VARCHAR(255),
    github_org_url VARCHAR(255),
    logo_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexación HNSW para búsqueda por similitud en tiempo real (alta velocidad)
CREATE INDEX IF NOT EXISTS idx_startups_embedding ON startups 
USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_startups_vertical ON startups(primary_vertical);
CREATE INDEX IF NOT EXISTS idx_startups_domain ON startups(domain);

-- ----------------------------------------------------------------------------
-- 2. FOUNDERS: Talento clave e historial (Pedigree)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS founders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255),
    github_handle VARCHAR(100),
    role VARCHAR(100) NOT NULL, -- ej: CEO, CTO, Lead Architect
    ex_companies JSONB DEFAULT '[]'::jsonb, -- Ej: ["Stripe", "OpenAI", "Google DeepMind"]
    previous_exits JSONB DEFAULT '[]'::jsonb, -- Ej: [{"company": "DataX", "acquired_by": "Databricks", "year": 2022}]
    is_technical BOOLEAN DEFAULT false,
    academic_background JSONB DEFAULT '[]'::jsonb, -- Ej: [{"degree": "PhD CS", "institution": "Stanford"}]
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_founders_startup_id ON founders(startup_id);

-- ----------------------------------------------------------------------------
-- 3. SIGNALS: Captura de eventos invisibles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    signal_type VARCHAR(100) NOT NULL, -- ej: 'github_star_acceleration', 'stealth_domain_creation'
    source VARCHAR(100) NOT NULL, -- ej: 'github_api', 'whois_monitor', 'linkedin_scraper'
    confidence_score NUMERIC(3,2) CHECK (confidence_score BETWEEN 0 AND 1), -- 0.00 a 1.00
    raw_payload JSONB NOT NULL, -- Datos crudos recibidos del webhook/scraper
    extracted_metrics JSONB DEFAULT '{}'::jsonb, -- Ej: {"stars_7d": 1200, "commit_velocity_increase": "450%"}
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_signals_startup_type ON signals(startup_id, signal_type);
CREATE INDEX IF NOT EXISTS idx_signals_detected_at ON signals(detected_at DESC);

-- ----------------------------------------------------------------------------
-- 4. THESIS_PARAMETERS: Tesis de inversión indexada por el VC
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS thesis_parameters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL, -- ej: "B2B AI Infrastructure & DevTools (Pre-Seed/Seed)"
    thesis_text TEXT NOT NULL, -- Descripción cualitativa
    embedding vector(3072), -- Embedding de la tesis completa
    hard_filters JSONB NOT NULL, -- Filtros de exclusión estricta
    scoring_weights JSONB NOT NULL, -- Distribución de pesos de calificación
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. EVALUATIONS: Diagnóstico agéntico e historia de puntuación
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    thesis_id UUID REFERENCES thesis_parameters(id) ON DELETE CASCADE,
    match_score INT CHECK (match_score BETWEEN 0 AND 100),
    vector_distance NUMERIC(5,4),
    summary_bullets JSONB DEFAULT '[]'::jsonb, -- Exactamente 3 viñetas concisas
    pros JSONB DEFAULT '[]'::jsonb,
    cons JSONB DEFAULT '[]'::jsonb,
    dealbreakers JSONB DEFAULT '[]'::jsonb, -- Red flags encontradas
    agent_reasoning_log TEXT, -- Traceability del flujo de pensamiento del LLM
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_evaluations_startup ON evaluations(startup_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_score ON evaluations(match_score DESC);

-- ----------------------------------------------------------------------------
-- 6. AGENT_LIVE_LOGS: Registro de eventos en tiempo real para Realtime WebSockets
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_live_logs (
    id BIGSERIAL PRIMARY KEY,
    session_key VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- ej: 'TRIAGE', 'SCRAPING', 'EVALUATING', 'COMPLETED', 'FAILED'
    message TEXT NOT NULL,
    tool_used VARCHAR(100),
    execution_time_ms INT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_agent_logs_session ON agent_live_logs(session_key, id);

-- ----------------------------------------------------------------------------
-- Supabase Realtime Publication
-- ----------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE signals;
        ALTER PUBLICATION supabase_realtime ADD TABLE evaluations;
        ALTER PUBLICATION supabase_realtime ADD TABLE agent_live_logs;
    END IF;
END $$;
