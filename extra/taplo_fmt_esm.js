/* @ts-self-types="./taplo_fmt.d.ts" */
// prettier-ignore
import source wasmModule from "./taplo_fmt_bg.wasm";

import * as import_bg from "./taplo_fmt_bg.js";
const { __wbg_set_wasm, ...wasmImport } = import_bg;

function getImports() {
	return {
		__proto__: null,
		"./taplo_fmt_bg.js": wasmImport,
	};
}

const instance = new WebAssembly.Instance(wasmModule, getImports());

/**
 * @import * as WASM from "./taplo_fmt_bg.wasm"
 */

/**
 * @type {WASM}
 */
const wasm = instance.exports;
__wbg_set_wasm(wasm);

export { format } from "./taplo_fmt_bg.js";
