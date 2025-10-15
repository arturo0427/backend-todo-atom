import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { env } from "../config/env.js";

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

// Ensure requests include a valid JWT token and expose payload data downstream.
export function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      "4c2b8e04e51f7a5c83b4a7c3f17cb8b6b70c4c8dc9f4db84e1ac9b27f2ea56e2" as string
    ) as TokenPayload;

    (req as any).userId = payload.userId;
    (req as any).email = payload.email;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
