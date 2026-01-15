#!/usr/bin/env node --test
import assert from "node:assert/strict";
import { glob, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, basename, join } from "node:path";
import { parseSnapshot } from "../test_utils/index.js";

import { format } from "../pkg/taplo_fmt_node.js";

const project_root = fileURLToPath(import.meta.resolve("../"));
const snapshots_root = fileURLToPath(import.meta.resolve("../test_snapshots"));

for await (const snap_path of glob("**/*.snap", { cwd: snapshots_root })) {
	const full_path = join(snapshots_root, snap_path);
	const snap_content = await readFile(full_path, "utf-8");
	const info = parseSnapshot(snap_content);
	if (!info) continue;

	const input_path = join(project_root, info.input_file);
	const input_dir = dirname(input_path);
	const expected_path = `${full_path}.${info.extension}`;

	const [input, expected, optionsText] = await Promise.all([
		readFile(input_path, "utf-8"),
		readFile(expected_path, "utf-8"),
		readFile(join(input_dir, "options.json"), "utf-8").catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(optionsText);
	} catch (e) {
		options = {};
	}

	const test_name = basename(input_dir);
	test(test_name, () => {
		const actual = format(input, options);
		assert.equal(actual, expected);
	});
}
