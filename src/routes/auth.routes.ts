import { Router } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { loginSchema } from "../interfaces/dtos.js";
import { validate } from "../middlewares/validate.js";
import { buildServices } from "./factory.js";
import * as functions from "firebase-functions";

const router = Router();
const { users } = buildServices();

const firebaseEnv = functions.config();

const jwtSecret =
  firebaseEnv?.jwt?.secret ||
  process.env.JWT_SECRET ||
  "4c2b8e04e51f7a5c83b4a7c3f17cb8b6b70c4c8dc9f4db84e1ac9b27f2ea56e2";

// Authenticate a user and return a signed JWT token.
router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.login(email, password);

    if (!jwtSecret)
      throw new Error("Missing JWT secret: Variables" + JSON.stringify(env));
    const secret: Secret = jwtSecret;
    const signOptions: SignOptions = {
      expiresIn: env.jwtExpiresIn as unknown as number | "12h",
    };

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      signOptions
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    });
  } catch (e) {
    next(e);
  }
});

export default router;
