#!/usr/bin/env node --test
import assert from "node:assert/strict";
import { glob, readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, basename } from "node:path";
import { parseSnapshot } from "../test_utils/index.js";

import { format } from "../pkg/taplo_fmt_node.js";

const project_root = fileURLToPath(import.meta.resolve("../"));
const snapshots_root = fileURLToPath(import.meta.resolve("../test_snapshots"));

for await (const snapshotPath of glob(`${snapshots_root}/*.snap`)) {
	const snapshotContent = await readFile(snapshotPath, "utf-8");
	const info = parseSnapshot(snapshotContent);
	if (!info) continue;

	const input_path = `${project_root}/${info.input_file}`;
	const case_path = dirname(input_path);
	const expected_path = `${snapshotPath}.${info.extension}`;

	const [input, expected, optionsText] = await Promise.all([
		readFile(input_path, "utf-8"),
		readFile(expected_path, "utf-8"),
		readFile(`${case_path}/options.json`, "utf-8").catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(optionsText);
	} catch (e) {
		options = {};
	}

	const test_name = basename(case_path);
	test(test_name, () => {
		const actual = format(input, options);
		assert.equal(actual, expected);
	});
}
