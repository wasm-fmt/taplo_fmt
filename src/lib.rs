use taplo::formatter::{self, Options, OptionsIncomplete};

#[cfg(test)]
mod tests;

#[cfg(target_arch = "wasm32")]
mod wasm_random {
    use std::sync::atomic::{AtomicU32, Ordering};

    // Taplo's ahash dependency requests 64 random bytes once for hash seeds.
    // Bridge modules are import-free, so use a per-instance non-cryptographic
    // generator instead of getrandom's wasm-bindgen-backed JavaScript backend.
    static STATE: AtomicU32 = AtomicU32::new(0x6d2b_79f5);

    #[unsafe(no_mangle)]
    unsafe extern "Rust" fn __getrandom_v03_custom(
        dest: *mut u8,
        len: usize,
    ) -> Result<(), getrandom::Error> {
        if len == 0 {
            return Ok(());
        }

        let mut state = STATE
            .fetch_add(0x9e37_79b9, Ordering::Relaxed)
            .wrapping_add(dest as usize as u32)
            .wrapping_add(len as u32);
        let output = unsafe { std::slice::from_raw_parts_mut(dest, len) };

        for byte in output {
            state ^= state << 13;
            state ^= state >> 17;
            state ^= state << 5;
            *byte = state as u8;
        }

        STATE.store(state, Ordering::Relaxed);
        Ok(())
    }
}

#[bridge::config]
#[derive(Clone, Debug, Default)]
struct TaploConfig(OptionsIncomplete);

impl bridge::Config for TaploConfig {
    fn decode(bytes: &[u8]) -> Result<Self, String> {
        if bytes.is_empty() {
            return Ok(Self::default());
        }

        serde_json::from_slice(bytes)
            .map(Self)
            .map_err(|err| err.to_string())
    }
}

/// Formats the given TOML code with the provided options.
#[bridge::formatter]
fn format(source: &str, config: &TaploConfig) -> Result<String, String> {
    Ok(format_impl(source, config.0.clone()))
}

pub(crate) fn format_impl(code: &str, options: OptionsIncomplete) -> String {
    let mut value = Options::default();
    value.update(options);
    formatter::format(code, value)
}
