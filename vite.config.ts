import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig(({mode}) => {
	console.log("mode", mode)
	return {
		server: {
			allowedHosts: ["*.local"],
		},
		plugins: [
			// this is the plugin that enables path aliases
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	}
});

export default config;
