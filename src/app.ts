import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());

// Configure CORS to accept requests from the configured frontend origin.
const allowedOrigins = ["https://todo-1a513.web.app", "http://localhost:4200"];

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

app.use(errorHandler);
export default app;
