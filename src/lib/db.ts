import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/repo/schema";
import { serverEnv } from "@/env/server";

const sql = neon(String(serverEnv.DB_URL));
export const db = drizzle({ client: sql, logger: true, schema });
