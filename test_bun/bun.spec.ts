#!/usr/bin/env bun test
import { dirname, basename, join } from "node:path";
import { expect, test } from "bun:test";
import { Glob } from "bun";
import { fileURLToPath } from "node:url";
import { parseSnapshot } from "../test_utils/index.js";

import init, { format } from "../pkg/taplo_fmt_web";

await init();

const project_root = fileURLToPath(import.meta.resolve("../"));
const snapshots_root = fileURLToPath(import.meta.resolve("../test_snapshots"));

for await (const snap_path of new Glob("**/*.snap").scan({ cwd: snapshots_root })) {
	const full_path = join(snapshots_root, snap_path);
	const snap_content = await Bun.file(full_path).text();
	const info = parseSnapshot(snap_content);
	if (!info) continue;

	const input_path = join(project_root, info.input_file);
	const input_dir = dirname(input_path);
	const expected_path = `${full_path}.${info.extension}`;

	const [input_text, expected_text, options_text] = await Promise.all([
		Bun.file(input_path).text(),
		Bun.file(expected_path).text(),
		Bun.file(join(input_dir, "options.json"))
			.text()
			.catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(options_text);
	} catch (_e) {
		options = {};
	}

	const test_name = basename(input_dir);
	test(test_name, () => {
		const actual = format(input_text, options);
		expect(actual).toBe(expected_text);
	});
}
