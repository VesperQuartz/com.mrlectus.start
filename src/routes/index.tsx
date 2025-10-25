import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "@/lib/orpc/client";

const App = () => {
	const todos = useQuery(
		orpc.listTodos.queryOptions({
			input: {},
		}),
	);
	return (
		<div className="text-center">
			<h1 className="text-3xl font-bold">com.mrlectus.start</h1>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
});
