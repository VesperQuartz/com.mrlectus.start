import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, bearer, openAPI } from "better-auth/plugins";
import { MailServer } from "@/services/mail";
import to from "await-to-ts";
import { transporter } from "./mail";
import { ac, adminRole, customRole, userRole } from "./permission";

export const auth = betterAuth({
	rateLimit: {
		window: 10,
		max: 100,
		enabled: true,
	},
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
		requireEmailVerification: true,
		autoSignIn: false,
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendOnSignIn: true,
		sendVerificationEmail: async ({ user, url }) => {
			const mail = new MailServer(transporter);
			const [error] = await to(
				mail.sendVerificationEmail({ recipient: user.email, tokenUrl: url }),
			);
			if (error) {
				console.error(error);
			}
		},
		afterEmailVerification: async (data) => {
			console.log(data);
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	user: {
		additionalFields: {
			role: {
				type: "string",
				input: true,
				required: false,
			},
		},
	},
	plugins: [
		admin({
			ac,
			roles: {
				admin: adminRole,
				user: userRole,
				custom: customRole,
			},
			defaultRole: "user",
			adminRoles: ["admin", "superadmin"],
		}),
		openAPI(),
		bearer(),
		reactStartCookies(), // Make sure this is last
	],
	databaseHooks: {
		user: {
			create: {
				before: async (user, ctx) => {
					if (!ctx?.body?.role) {
						return {
							data: { ...user },
						};
					}
					return { data: { ...user, role: ctx?.body?.role } };
				},
			},
		},
	},
});
