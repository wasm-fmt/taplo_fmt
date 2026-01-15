use taplo::formatter::{self, Options, OptionsIncomplete};
use wasm_bindgen::prelude::*;

#[cfg(test)]
mod tests;

#[wasm_bindgen(typescript_custom_section)]
const TS_Types: &'static str = r#"
import type { Options } from "./taplo_fmt_options.d.ts";
export type * from "./taplo_fmt_options.d.ts";
"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Options")]
    pub type Config;
}

/// Formats the given TOML code with the provided options.
#[wasm_bindgen]
pub fn format(
    #[wasm_bindgen(param_description = "The TOML code to format")] code: &str,
    #[wasm_bindgen(param_description = "Formatting options")] options: Option<Config>,
) -> Result<String, String> {
    let options = options
        .map(Into::into)
        .map(serde_wasm_bindgen::from_value)
        .transpose()
        .map_err(|e| e.to_string())?
        .unwrap_or_default();

    Ok(format_impl(code, options))
}

pub(crate) fn format_impl(code: &str, options: OptionsIncomplete) -> String {
    let mut value = Options::default();
    value.update(options);
    formatter::format(code, value)
}
