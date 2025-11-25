import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/globals.css?url";
import { LoadingProvider } from "@/providers/loaders/loader";
import TanStackQueryDevtools from "@/providers/query/devtools";

export interface RootContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<LoadingProvider>
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-left",
							openHotkey: ["Meta", "Shift", "O"],
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
							formDevtoolsPlugin(),
						]}
					/>
				</LoadingProvider>
				<Scripts />
				<Toaster />
			</body>
		</html>
	);
}
