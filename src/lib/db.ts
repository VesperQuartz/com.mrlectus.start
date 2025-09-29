import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";
import * as schema from "@/repo/schema";

const sql = neon(env.DB_URL);
export const db = drizzle({ client: sql, logger: true, schema });
