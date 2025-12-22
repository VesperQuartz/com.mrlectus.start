import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const App = () => {
	return (
		<div className="mt-1 flex flex-col items-center justify-center gap-1">
			Hello, world
			<Button onClick={() => toast.success("Hello")}>Hello</Button>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {},
});
