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

dotenv.config();

const isFirebase = process.env.FIREBASE_CONFIG !== undefined;

const getFirebaseConfig = () => {
  if (!isFirebase) return null;

  try {
    const functions = require("firebase-functions");
    return functions.config();
  } catch (error) {
    return null;
  }
};

const firebaseConfig = getFirebaseConfig();

export const env = {
  port: Number(process.env.LOCAL_PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || "production",
  frontendUrl: isFirebase
    ? firebaseConfig?.env?.frontend_url
    : process.env.FRONTEND_URL,
  frontendLocalHostUrl: isFirebase
    ? firebaseConfig?.env?.frontend_localhost_url
    : process.env.FRONTEND_LOCALHOST_URL,
  jwtSecret: isFirebase ? firebaseConfig?.jwt?.secret : process.env.JWT_SECRET,
  jwtExpiresIn: isFirebase
    ? firebaseConfig?.jwt?.expires_in
    : process.env.JWT_EXPIRES_IN,
};
