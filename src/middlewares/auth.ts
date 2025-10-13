import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// Ensure requests include a valid JWT token and expose payload data downstream.
export function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers["authorization"] || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }
  try {
    const payload = jwt.verify(token, env.jwtSecret) as {
      userId: string;
      email: string;
    };
    (req as any).userId = payload.userId;
    (req as any).email = payload.email;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
