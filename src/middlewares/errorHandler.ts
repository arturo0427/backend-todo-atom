import { Request, Response, NextFunction } from "express";

// Centralized error formatting so clients receive consistent responses.
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status ?? 400;
  res.status(status).json({
    error: { message: err.message ?? "Unknown error", details: err.details },
  });
}
