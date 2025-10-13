import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5001),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:4200',
  jwtSecret: process.env.JWT_SECRET ?? 'dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '12h',
};
