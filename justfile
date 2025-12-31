set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]
set shell := ["bash", "-cu"]

_default:
  @just --list -u

alias test := test-rust

[group('test')]
test-rust:
	cargo test

[group('test')]
test-bun:
	bun test test_bun/bun.spec.ts

[group('test')]
test-deno:
	deno test test_deno/deno.test.ts --allow-read --parallel

[group('test')]
test-node:
	node --test test_node/test-node.mjs

[group('test')]
test-wasm: test-node test-deno test-bun

[group('test')]
test-all: test-rust test-wasm

[unix]
build:
	wasm-pack build --target=web --scope=wasm-fmt .
	cp -R ./extra/. ./pkg/
	node ./scripts/package.mjs ./pkg/package.json

[windows]
build:
	wasm-pack build --target=web --scope=wasm-fmt .
	Copy-Item -Recurse -Force ./extra/* ./pkg/
	node ./scripts/package.mjs ./pkg/package.json

fmt:
	cargo fmt --all
	taplo fmt .
	dprint fmt

check:
	cargo check --all
	cargo clippy --all -- -D warnings
	cargo fmt --all --check
	taplo fmt --check .
	dprint check

audit:
	cargo audit