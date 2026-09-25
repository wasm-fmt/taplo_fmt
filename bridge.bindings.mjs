import { defineBindings } from "@wasm-fmt/bindgen";

export default defineBindings({
	name: "taplo_fmt",
	wasm: "target/wasm32-unknown-unknown/release/taplo_fmt.wasm",
	wasmFile: "taplo_fmt_bg.wasm",
	adapter: "bindings/taplo_fmt_binding.js",
	types: {
		main: "bindings/taplo_fmt.d.ts",
	},
	assets: [
		"package.json",
		"jsr.jsonc",
		"README.md",
		"LICENSE-MIT",
		"LICENSE-APACHE",
		"bindings/.npmignore",
		"bindings/taplo_fmt_options.d.ts",
	],
	outDir: "pkg",
	clean: true,
});
