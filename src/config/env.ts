import "dotenv/config"

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "fallback-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",
}
