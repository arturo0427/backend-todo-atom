// import dotenv from "dotenv";
// dotenv.config();

// // Centralize environment-driven configuration with sensible defaults.
// export const env = {
//   port: Number(process.env.LOCAL_PORT),
//   nodeEnv: process.env.NODE_ENV,
//   frontendUrl: process.env.FRONTEND_URL,
//   frontendLocalHostUrl: process.env.FRONTEND_LOCALHOST_URL,
//   jwtSecret: process.env.JWT_SECRET,
//   jwtExpiresIn: process.env.JWT_EXPIRES_IN,
// };

import dotenv from "dotenv";
import * as functions from "firebase-functions";

dotenv.config();

const firebaseEnv = functions.config();

export const env = {
  port: Number(process.env.LOCAL_PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || "production",
  frontendUrl:
    firebaseEnv?.env?.frontend_url ||
    process.env.FRONTEND_URL ||
    "https://todo-1a513.web.app",
  frontendLocalHostUrl:
    firebaseEnv?.env?.frontend_localhost_url ||
    process.env.FRONTEND_LOCALHOST_URL ||
    "http://localhost:4200",
  jwtSecret:
    firebaseEnv?.jwt?.secret ||
    process.env.JWT_SECRET ||
    "4c2b8e04e51f7a5c83b4a7c3f17cb8b6b70c4c8dc9f4db84e1ac9b27f2ea56e2",
  jwtExpiresIn:
    firebaseEnv?.jwt?.expires_in || process.env.JWT_EXPIRES_IN || "12h",
};
