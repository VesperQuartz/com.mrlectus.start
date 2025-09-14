import { createFileRoute } from "@tanstack/react-router";

const App = () => {
	return (
		<div className="text-center">
			<h1 className="text-3xl font-bold">com.mrlectus.start</h1>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
});
