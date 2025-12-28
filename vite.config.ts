import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
// import { nitro } from "nitro-nightly/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig(({ mode }) => {
	return {
		server: {
			allowedHosts: ["*.local", "strong-carefully-fly.ngrok-free.app"],
		},
		nitro: {
			preset: "bun",
			compressPublicAssets: true,
			prerender: {
				crawlLinks: true,
			},
		},
		plugins: [
			devtools(),
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
			tanstackStart({
				prerender: {
					autoStaticPathsDiscovery: true,
					crawlLinks: true,
					// enabled: mode === "production",
				},
			}),
			nitro(),
			viteReact({
				babel: {
					plugins: [["babel-plugin-react-compiler"]],
				},
			}),
		],
	};
});

export default config;
