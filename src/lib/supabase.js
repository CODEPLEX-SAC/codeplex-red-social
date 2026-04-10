import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = "https://mdkmnndgbvfmevlonnhb.supabase.co";
const SUPABASE_KEY  = "sb_publishable_GmLj4hjJ_NlNkyQNFjxY3g_ipodvcCH";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
