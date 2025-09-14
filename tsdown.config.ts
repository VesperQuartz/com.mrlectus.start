import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**"],
	exports: true,
	dts: true,
	css: {
		fileName: "global.css",
	},
});
