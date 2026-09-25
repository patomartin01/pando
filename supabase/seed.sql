-- ============================================================================
-- PANDO: Seed Data for Phase 1 & 2
-- High-Conviction Startups, Signals, Founders, Thesis and Evaluations
-- ============================================================================

-- Active VC Thesis
INSERT INTO thesis_parameters (id, name, thesis_text, hard_filters, scoring_weights, is_active)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'B2B AI Infrastructure & DevTools (Pre-Seed/Seed)',
    'Buscamos equipos altamente técnicos (ex-infraestructura de FAANG/Unicornios o PhDs) construyendo herramientas para desarrolladores, orquestación de LLMs, bases de datos vectoriales de nueva generación, y seguridad en IA. Priorizamos proyectos open-source con alta velocidad de commits y adopción orgánica rápida antes de lanzar producto comercial.',
    '{
        "allowed_geographies": ["US", "CA", "EU", "UK", "LATAM"],
        "excluded_verticals": ["D2C", "E-commerce", "Crypto Speculative", "Web3 Gaming"],
        "max_company_age_months": 18,
        "require_technical_founder": true
    }'::jsonb,
    '{
        "team_pedigree": 0.35,
        "technical_velocity": 0.30,
        "thesis_vector_fit": 0.20,
        "early_traction": 0.15
    }'::jsonb,
    true
) ON CONFLICT DO NOTHING;
