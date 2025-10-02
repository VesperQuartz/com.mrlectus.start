import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { clientEnv } from "@/env/client";

export const authClient = createAuthClient({
	baseURL: clientEnv.VITE_BASE_URL,
	plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});
