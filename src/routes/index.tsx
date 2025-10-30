import { createFileRoute } from "@tanstack/react-router";

const App = () => {
	return (
		<div className="flex flex-col gap-1 mt-1 items-center justify-center">
			Hello, world
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {},
});
