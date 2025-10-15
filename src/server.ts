import app from "./app.js";
import { env } from "./config/env.js";

// Boot the HTTP server and log the active port for diagnostics.
app.listen(env.port, () => console.log(`[api] http://localhost:${env.port}`));
