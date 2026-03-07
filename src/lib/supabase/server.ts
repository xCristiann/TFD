import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/config/env";

export const supabaseServer = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});
