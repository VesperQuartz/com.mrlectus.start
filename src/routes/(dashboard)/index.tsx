import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "@/middleware/auth";

const App = () => {
	return <div className="p-4 text-center">hello</div>;
};

export const Route = createFileRoute("/(dashboard)/")({
	component: App,
	loader: async () => {},
	server: {
		middleware: [authMiddleware],
	},
});
