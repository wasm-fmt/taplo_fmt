import initAsync from "./taplo_fmt.js";
import wasm from "./taplo_fmt_bg.wasm?url";

export default function __wbg_init(input = { module_or_path: wasm }) {
	return initAsync(input);
}

export * from "./taplo_fmt.js";
