#!/usr/bin/env deno test --allow-read --parallel
import { assertEquals } from "jsr:@std/assert";
import { expandGlob } from "jsr:@std/fs";
import { fromFileUrl, dirname, basename } from "jsr:@std/path";
import { parseSnapshot } from "../test_utils/index.js";

import init, { format } from "../pkg/taplo_fmt.js";

await init();

const project_root = fromFileUrl(import.meta.resolve("../"));
const snapshots_root = fromFileUrl(import.meta.resolve("../test_snapshots"));

for await (const { path: snap_path } of expandGlob(`${snapshots_root}/*.snap`)) {
	const snap_content = await Deno.readTextFile(snap_path);
	const info = parseSnapshot(snap_content);
	if (!info) continue;

	const input_path = `${project_root}/${info.input_file}`;
	const case_path = dirname(input_path);
	const expected_path = `${snap_path}.${info.extension}`;

	const [inputText, expectedText, optionsText] = await Promise.all([
		Deno.readTextFile(input_path),
		Deno.readTextFile(expected_path),
		Deno.readTextFile(`${case_path}/options.json`).catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(optionsText);
	} catch (_e) {
		options = {};
	}

	const test_name = basename(case_path);
	Deno.test(test_name, () => {
		const actual = format(inputText, options);
		assertEquals(actual, expectedText);
	});
}
