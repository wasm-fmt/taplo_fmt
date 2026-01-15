#!/usr/bin/env deno test --allow-read --parallel
import { assertEquals } from "jsr:@std/assert";
import { expandGlob } from "jsr:@std/fs";
import { fromFileUrl, dirname, basename, join } from "jsr:@std/path";
import { parseSnapshot } from "../test_utils/index.js";

import { format } from "../pkg/taplo_fmt_esm.js";

const project_root = fromFileUrl(import.meta.resolve("../"));
const snapshots_root = fromFileUrl(import.meta.resolve("../test_snapshots"));

for await (const { path: snap_path } of expandGlob("**/*.snap", {
	root: snapshots_root,
})) {
	const snap_content = await Deno.readTextFile(snap_path);
	const info = parseSnapshot(snap_content);
	if (!info) continue;

	const input_path = join(project_root, info.input_file);
	const input_dir = dirname(input_path);
	const expected_path = `${snap_path}.${info.extension}`;

	const [input_text, expected_text, options_text] = await Promise.all([
		Deno.readTextFile(input_path),
		Deno.readTextFile(expected_path),
		Deno.readTextFile(`${input_dir}/options.json`).catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(options_text);
	} catch (_e) {
		options = {};
	}

	const test_name = basename(input_dir);
	Deno.test(test_name, () => {
		const actual = format(input_text, options);
		assertEquals(actual, expected_text);
	});
}
