import { orpc } from "@/orpc/client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const App = () => {
	const todos = useQuery(orpc.listTodos.queryOptions({
			input: {
		}
	}));
	console.log(todos?.data);
	return (
		<div className="text-center">
			<h1 className="text-3xl font-bold">com.mrlectus.start</h1>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
});
