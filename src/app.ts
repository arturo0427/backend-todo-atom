import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

app.use(errorHandler);
export default app;
