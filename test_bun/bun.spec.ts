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

const glob = new Glob("*.snap");

for await (const snap_path of glob.scan({ cwd: snapshots_root })) {
	const snapshotPath = join(snapshots_root, snap_path);
	const snapshotContent = await Bun.file(snapshotPath).text();
	const info = parseSnapshot(snapshotContent);
	if (!info) continue;

	const input_path = join(project_root, info.input_file);
	const case_path = dirname(input_path);
	const expected_path = `${snapshotPath}.${info.extension}`;

	const [inputText, expectedText, optionsText] = await Promise.all([
		Bun.file(input_path).text(),
		Bun.file(expected_path).text(),
		Bun.file(join(case_path, "options.json"))
			.text()
			.catch(() => "{}"),
	]);

	let options;
	try {
		options = JSON.parse(optionsText);
	} catch (_e) {
		options = {};
	}

	const test_name = basename(case_path);
	test(test_name, () => {
		const actual = format(inputText, options);
		expect(actual).toBe(expectedText);
	});
}
