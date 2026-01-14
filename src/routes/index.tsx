import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const App = () => {
	return (
		<div className="p-4 text-center">
			<ClientOnly>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const data = Object.fromEntries(formData.entries());
						console.log(data);
					}}
				>
					<div className="flex flex-col gap-4">
						<Input
							type="text"
							name="name"
							placeholder="Name"
							className="w-fit border border-blue-500"
						/>
						<Button type="submit" className={"w-fit cursor-pointer"}>
							Submit
						</Button>
					</div>
				</form>
			</ClientOnly>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {},
});
