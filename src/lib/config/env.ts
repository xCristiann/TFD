const requiredKeys = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
};

export const env = {
  supabaseUrl: requiredKeys.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: requiredKeys.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: requiredKeys.SUPABASE_SERVICE_ROLE_KEY ?? "",
  stripeSecretKey: requiredKeys.STRIPE_SECRET_KEY ?? "",
  appUrl: requiredKeys.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
};

export const missingEnvKeys = Object.entries(requiredKeys)
  .filter(([, value]) => !value)
  .map(([key]) => key);
