import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Apply schema validation to the selected request section before invoking handlers.
export const validate =
  (schema: ZodSchema<any>, target: "body" | "query" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success)
      return next({
        status: 422,
        message: "Validation failed",
        details: result.error.format(),
      });
    (req as any)[target] = result.data;
    next();
  };
