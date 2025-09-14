import { env } from "@/config/env";
import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL: env.baseUrl,
	plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});
