import { Router } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { loginSchema } from "../interfaces/dtos.js";
import { validate } from "../middlewares/validate.js";
import { buildServices } from "./factory.js";

const router = Router();
const { users } = buildServices();

router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.login(email, password);

    if (!env.jwtSecret) throw new Error("Missing JWT secret");
    const secret: Secret = env.jwtSecret;
    const signOptions: SignOptions = {
      expiresIn: env.jwtExpiresIn as unknown as number | undefined,
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
