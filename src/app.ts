import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());

// Configure CORS to accept requests from the configured frontend origin.
const allowedOrigins = [env.frontendUrl, env.frontendLocalHostUrl];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Mount core API route groups.
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);

app.get("/test", (_req, res) => {
  res.send(
    "hola mundo simple " + env.frontendUrl + " " + env.frontendLocalHostUrl
  );
});

app.use(errorHandler);
export default app;
