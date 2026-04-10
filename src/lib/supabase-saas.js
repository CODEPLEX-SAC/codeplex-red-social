import { createClient } from '@supabase/supabase-js';

/* ── Cliente Supabase exclusivo para el sistema SaaS ──
   Proyecto separado del de Red Social.
   Usuarios SaaS nunca se mezclan con usuarios de Red Social.
──────────────────────────────────────────────────────── */
const SUPABASE_SAAS_URL = "https://pcdbhnmkpxfmuhugqiss.supabase.co";
const SUPABASE_SAAS_KEY = "sb_publishable_AkwOFp3bpQscQbzAkcbB1A_Pl2HSSUu";

export const supabaseSaas = createClient(SUPABASE_SAAS_URL, SUPABASE_SAAS_KEY);
