use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(typescript_custom_section)]
const TS_Types: &'static str = r#"
/**
 *  See {@link https://taplo.tamasfe.dev/configuration/formatter-options.html}
 */
export interface Options {
	/**
	 * Align entries vertically.
	 *
	 * Entries that have table headers, comments,
	 * or blank lines between them are not aligned.
	 */
	align_entries?: boolean;
	/**
	 * Align consecutive comments after entries and items vertically.
	 *
	 * This applies to comments that are after entries or array items.
	 */
	align_comments?: boolean;
	/**
	 * If `align_comments` is true, apply the alignment in cases where
	 * there's only one comment.
	 */
	align_single_comments?: boolean;
	/**
	 * Put trailing commas for multiline
	 * arrays.
	 */
	array_trailing_comma?: boolean;
	/**
	 * Automatically expand arrays to multiple lines once they
	 * exceed the configured `column_width`.
	 */
	array_auto_expand?: boolean;
	/**
	 * Expand values (e.g.) inside inline tables
	 * where possible.
	 */
	inline_table_expand?: boolean;
	/**
	 * Automatically collapse arrays if they
	 * fit in one line.
	 *
	 * The array won't be collapsed if it
	 * contains a comment.
	 */
	array_auto_collapse?: boolean;
	/**
	 * Omit whitespace padding inside single-line arrays.
	 */
	compact_arrays?: boolean;
	/**
	 * Omit whitespace padding inside inline tables.
	 */
	compact_inline_tables?: boolean;
	/**
	 * Omit whitespace around `=`.
	 */
	compact_entries?: boolean;
	/**
	 * Target maximum column width after which
	 * arrays are expanded into new lines.
	 *
	 * This is best-effort and might not be accurate.
	 */
	column_width?: number;
	/**
	 * Indent subtables if they come in order.
	 */
	indent_tables?: boolean;
	/**
	 * Indent entries under tables.
	 */
	indent_entries?: boolean;
	/**
	 * Indentation to use, should be tabs or spaces
	 * but technically could be anything.
	 */
	indent_string?: string;
	/**
	 * Add trailing newline to the source.
	 */
	trailing_newline?: boolean;
	/**
	 * Alphabetically reorder keys that are not separated by blank lines.
	 */
	reorder_keys?: boolean;
	/**
	 * Alphabetically reorder array values that are not separated by blank lines.
	 */
	reorder_arrays?: boolean;
	/**
	 * Alphabetically reorder inline table values.
	 */
	reorder_inline_tables?: boolean;
	/**
	 * The maximum amount of consecutive blank lines allowed.
	 */
	allowed_blank_lines?: number;
	/**
	 * Use CRLF line endings
	 */
	crlf?: boolean;
}
"#;
