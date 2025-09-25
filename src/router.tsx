import {
	createRouter,
	parseSearchWith,
	stringifySearchWith,
} from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { parse, stringify } from "jsurl2";
import * as TanstackQuery from "@/providers/query/root-provider";
import { DefaultCatchBoundary } from "./components/catch-boundary";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createRouter({
		routeTree,
		parseSearch: parseSearchWith(parse),
		stringifySearch: stringifySearchWith(stringify),
		scrollRestoration: true,
		context: { ...rqContext },
		defaultPreload: "intent",
		defaultErrorComponent: DefaultCatchBoundary,
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<TanstackQuery.Provider {...rqContext}>
					{props.children}
				</TanstackQuery.Provider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
