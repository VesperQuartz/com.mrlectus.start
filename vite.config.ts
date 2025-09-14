import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";

const config = defineConfig(({ mode }) => {
	console.log("mode", mode);
	return {
		server: {
			allowedHosts: ["*.local", "strong-carefully-fly.ngrok-free.app"],
			proxy: {},
		},
		resolve: {
			tsconfigPaths: true,
		},
		plugins: [
			devtools(),
			tailwindcss(),
			tanstackStart({
				prerender: {
					// enabled: true,
				},
			}),
			babel({
				presets: [reactCompilerPreset()],
				include: [/\.(ts|tsx|js|jsx)$/],
			}),
			removeConsole(),
			nitro({
				preset: "bun",
				compressPublicAssets: true,
				prerender: {
					crawlLinks: true,
				},
			}),
			viteReact(),
		],
	};
});

export default config;
