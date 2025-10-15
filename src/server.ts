import app from "./app.js";
import { env } from "./config/env.js";

// Boot the HTTP server and log the active port for diagnostics.
app.listen(env.local_port, () =>
  console.log(`[api] http://localhost:${env.local_port}`)
);
