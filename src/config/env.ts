import dotenv from "dotenv";
dotenv.config();

// Centralize environment-driven configuration with sensible defaults.
export const env = {
  port: Number(process.env.LOCAL_PORT),
  nodeEnv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
  frontendLocalHostUrl: process.env.FRONTEND_LOCALHOST_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
