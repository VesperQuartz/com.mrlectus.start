import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});
