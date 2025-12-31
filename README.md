[![Test](https://github.com/wasm-fmt/taplo_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/taplo_fmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/taplo_fmt?color=de591b)](https://www.npmjs.com/package/@wasm-fmt/taplo_fmt)

```bash
npm install @wasm-fmt/taplo_fmt
```

[![jsr.io](https://jsr.io/badges/@fmt/taplo-fmt?color=de591b)](https://jsr.io/@fmt/taplo-fmt)

```bash
npx jsr add @fmt/taplo-fmt
```

# Usage

```javascript
import init, { format } from "@wasm-fmt/taplo_fmt";

await init();

const input = `name = "example"
version = "0.1.0"
[dependencies]
serde = "1.0"`;

const formatted = format(input);
console.log(formatted);
```

with custom options:

```javascript
import init, { format } from "@wasm-fmt/taplo_fmt";

await init();

const input = `name = "example"
version = "0.1.0"
[dependencies]
serde = "1.0"`;

const formatted = format(input, {
	column_width: 80,
	indent_entries: true,
	align_entries: true,
	align_comments: true,
});
console.log(formatted);
```

For Vite users:

Add `"@wasm-fmt/taplo_fmt"` to `optimizeDeps.exclude` in your vite config:

```JSON
{
	"optimizeDeps": {
		"exclude": ["@wasm-fmt/taplo_fmt"]
	}
}
```

<details>
<summary>
If you cannot change the vite config, you can use another import entry

</summary>

```JavaScript
import init, { format } from "@wasm-fmt/taplo_fmt/vite";

// ...
```

</details>

# How does it work?

[Taplo] is a TOML parser, analyzer, and formatter library, written in Rust.

This package is a WebAssembly build of the Taplo formatter, with a JavaScript wrapper.

[Taplo]: https://github.com/tamasfe/taplo

# Credits

Thanks to:

- The [Taplo](https://github.com/tamasfe/taplo) project created by [Ferenc Tamás](https://github.com/tamasfe)
