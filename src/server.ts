import app from './app.js';
import { env } from './config/env.js';
app.listen(env.port, () => console.log(`[api] http://localhost:${env.port}`));
