import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
// import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig(() => {
	return {
		server: {
			allowedHosts: ["*.local"],
		},
		plugins: [
			devtools(),
			// this is the plugin that enables path aliases
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
			tanstackStart(),
			nitro(),
			// nitroV2Plugin({
			// 	preset: "node_server",
			// 	compatibilityDate: "2025-10-21",
			// }),
			viteReact({
				babel: {
					plugins: [["babel-plugin-react-compiler"]],
				},
			}),
		],
	};
});

export default config;
