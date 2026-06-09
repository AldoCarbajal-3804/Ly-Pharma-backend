import "dotenv/config"

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  CORS_ORIGINS: (process.env.CORS_ORIGINS || "http://localhost:5173").split(","),
  API_PREFIX: process.env.API_PREFIX || "/api",
  JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
}
