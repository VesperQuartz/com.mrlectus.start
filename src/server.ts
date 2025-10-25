import handler from "@tanstack/react-start/server-entry";

export default {
	port: 4000,
	fetch(request: Request) {
		return handler.fetch(request);
	},
};
