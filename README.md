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

## Node.js / Deno / Bun / Bundler

```javascript
import { format } from "@wasm-fmt/taplo_fmt";

const input = `name = "example"
version = "0.1.0"
[dependencies]
serde = "1.0"`;

const formatted = format(input);
console.log(formatted);
```

with custom options:

```javascript
import { format } from "@wasm-fmt/taplo_fmt";

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

## Web

For web environments, you need to initialize the WASM module manually:

```javascript
import init, { format } from "@wasm-fmt/taplo_fmt/web";

await init();

const input = `name = "example"
version = "0.1.0"
[dependencies]
serde = "1.0"`;

const formatted = format(input);
console.log(formatted);
```

### Vite

```JavaScript
import init, { format } from "@wasm-fmt/taplo_fmt/vite";

await init();
// ...
```

## Entry Points

- `.` - Auto-detects environment (Node.js uses node, Webpack uses bundler, default is ESM)
- `./node` - Node.js environment (no init required)
- `./esm` - ESM environments like Deno (no init required)
- `./bundler` - Bundlers like Webpack (no init required)
- `./web` - Web browsers (requires manual init)
- `./vite` - Vite bundler (requires manual init)

# Credits

Thanks to:

- The [Taplo](https://github.com/tamasfe/taplo) project created by [Ferenc Tamás](https://github.com/tamasfe)
