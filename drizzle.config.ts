import '@dotenvx/dotenvx/config';
import { env } from "@/env";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/repo/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URL,
  },
});
