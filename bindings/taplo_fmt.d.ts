/**
 * WASM formatter for TOML files.
 *
 * @example
 * ```ts
 * import { format } from "@wasm-fmt/taplo_fmt";
 *
 * const output = format('name="example"');
 * ```
 *
 * @module
 */

import type { ConfigHandle as BridgeConfigHandle } from "@wasm-fmt/runtime";
import type { Options } from "./taplo_fmt_options.d.ts";
export type * from "./taplo_fmt_options.d.ts";

/** A reusable formatter configuration created inside the WASM instance. */
export type ConfigHandle = BridgeConfigHandle<"taplo_fmt">;

export type ConfigInput = Options | ConfigHandle;

/** Formats a TOML string. */
export declare function format(input: string, options?: ConfigInput): string;

/** Formats a TOML string. The path is accepted for the shared formatter API. */
export declare function format(input: string, path?: string, options?: ConfigInput): string;

/** Creates a reusable formatter configuration. */
export declare function createConfig(options?: Options): ConfigHandle;

/** Releases a reusable formatter configuration. */
export declare function releaseConfig(handle: ConfigHandle): void;
