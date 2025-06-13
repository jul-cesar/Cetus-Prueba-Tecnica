import { serve } from "@hono/node-server";
import { handle } from "hono/vercel";
import app from "../src/server.js";

serve(
  {
    fetch: app.fetch,
    port: 3001, // Changed from 3000 to 3001 to match Docker configuration
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);