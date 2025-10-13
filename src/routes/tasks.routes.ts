import { Router } from "express";
import { buildServices } from "./factory.js";
import { validate } from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema } from "../interfaces/dtos.js";
import { authGuard } from "../middlewares/auth.js";

const router = Router();
const { tasks } = buildServices();

router.use(authGuard);

router.get("/", async (req, res, next) => {
  try {
    const userId = String((req as any).userId);
    const list = await tasks.list(userId);
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.post("/", validate(createTaskSchema), async (req, res, next) => {
  try {
    const { userId, title, description } = req.body;
    if (userId !== (req as any).userId)
      return res.status(403).json({ message: "Forbidden user" });
    const created = await tasks.create(userId, title, description);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validate(updateTaskSchema), async (req, res, next) => {
  try {
    const updated = await tasks.update(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await tasks.remove(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
