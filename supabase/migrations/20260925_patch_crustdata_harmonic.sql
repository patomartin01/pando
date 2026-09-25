-- ============================================================================
-- PANDO: Parche SQL Fase 1 (Integración Crustdata & Harmonic)
-- Series Temporales, Estados de Trabajo VC, Bucle RLHF y Team Overlap
-- ============================================================================

-- 1. TABLA DE SERIES TEMPORALES (Para gráficos de velocidad tipo Crustdata)
CREATE TABLE IF NOT EXISTS metrics_time_series (
    id BIGSERIAL PRIMARY KEY,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL, -- 'github_stars', 'linkedin_headcount', 'engineering_headcount', 'web_traffic'
    value NUMERIC(12,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_metrics_ts_startup_type ON metrics_time_series(startup_id, metric_type, recorded_at DESC);


-- 2. ESTADOS DE TRABAJO DEL VC (Pipeline Kanban)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'deal_stage_enum') THEN
        CREATE TYPE deal_stage_enum AS ENUM (
            'NEW_SIGNAL', 
            'AI_QUALIFIED', 
            'SAVED_FOR_REVIEW', 
            'OUTREACH_PENDING', 
            'CONTACTED', 
            'PASSED', 
            'INVESTED'
        );
    END IF;
END $$;

ALTER TABLE startups ADD COLUMN IF NOT EXISTS pipeline_status deal_stage_enum DEFAULT 'NEW_SIGNAL';


-- 3. BUCLE DE FEEDBACK PARA RLHF Y AJUSTE DE PROMPTS
CREATE TABLE IF NOT EXISTS feedback_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    user_action VARCHAR(50) NOT NULL, -- 'ACCEPTED', 'REJECTED', 'FALSE_POSITIVE'
    rejection_reason VARCHAR(100), -- 'Too early', 'Market too small', 'Not technical team', 'Out of thesis'
    user_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_startup ON feedback_logs(startup_id);


-- 4. OVERLAP EN EQUIPO FUNDADOR (Relación en Grafo)
ALTER TABLE founders ADD COLUMN IF NOT EXISTS team_overlap_matrix JSONB DEFAULT '[]'::jsonb;
-- Ej payload: [{"co_founder_id": "uuid...", "previous_company": "Stripe", "years_overlapped": 3.5}]
