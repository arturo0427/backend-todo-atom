import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());

// Configure CORS to accept requests from the configured frontend origin.
const allowedOrigins = [
  "https://todo-1a513.web.app",
  "http://localhost:4200",
  "https://us-central1-todo-1a513.cloudfunctions.net",
  "https://todo-1a513.firebaseapp.com/auth/login",
];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     // credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
