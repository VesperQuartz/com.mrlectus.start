import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { Activity, useTransition } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/(auth)/login")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

function RouteComponent() {
	const [isLoading, startTransition] = useTransition();
	const search = Route.useSearch();
	console.log("Search", search);
	return (
		<div className="p-4 text-center">
			<ClientOnly>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const data = Object.fromEntries(formData.entries());
						startTransition(async () => {
							console.log("data", data);
							await authClient.signIn.email({
								email: data.email,
								password: data.password,
								callbackURL: search?.redirect ? search.redirect : "/",
							});
						});
					}}
				>
					<div className="flex flex-col gap-4">
						<Input
							type="email"
							name="email"
							placeholder="Email"
							className="w-fit border border-blue-500"
						/>
						<Input
							type="password"
							name="password"
							placeholder="password"
							className="w-fit border border-blue-500"
						/>
						<Button
							disabled={isLoading}
							type="submit"
							className={"w-fit cursor-pointer"}
						>
							Submit{" "}
							<Activity mode={isLoading ? "visible" : "hidden"}>
								<LoaderCircleIcon className="animate-spin" />
							</Activity>
						</Button>
					</div>
				</form>
			</ClientOnly>
		</div>
	);
}
