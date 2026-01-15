/* @ts-self-types="./taplo_fmt.d.ts" */
import { readFileSync } from "node:fs";
import * as import_bg from "./taplo_fmt_bg.js";
const { __wbg_set_wasm, format, ...wasmImport } = import_bg;

const wasmUrl = new URL("taplo_fmt_bg.wasm", import.meta.url);
const wasmBytes = readFileSync(wasmUrl);
const wasmModule = new WebAssembly.Module(wasmBytes);

function getImports() {
	return {
		__proto__: null,
		"./taplo_fmt_bg.js": wasmImport,
	};
}

/**
 * @import * as WASM from "./taplo_fmt.wasm"
 */

const instance = new WebAssembly.Instance(wasmModule, getImports());

/**
 * @type {WASM}
 */
const wasm = instance.exports;
__wbg_set_wasm(wasm);

export { format };
