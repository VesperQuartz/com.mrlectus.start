import {
	createMiddleware,
	registerGlobalMiddleware,
} from "@tanstack/react-start";

const checkAuth = createMiddleware({ type: "function" }).server(({ next }) => {
	console.log("checkAuth");
	return next();
});

registerGlobalMiddleware({
	middleware: [checkAuth],
});
