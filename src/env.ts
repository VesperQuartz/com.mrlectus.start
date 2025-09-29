import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_URL: z.url().optional(),
		BETTER_AUTH_SECRET: z.string(),
		DB_URL: z.string(),
		MAIL_USER: z.string(),
		MAIL_PASS: z.string(),
	},
	clientPrefix: "VITE_",
	client: {
		VITE_APP_TITLE: z.string().min(1).optional(),
		VITE_BASE_URL: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation: false,
});
