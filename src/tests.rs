use std::fs::File;
use std::io::Read;
use std::path::Path;

use taplo::formatter::OptionsIncomplete;

use crate::format_impl;

#[test]
fn test_format() {
    insta::with_settings!({
        snapshot_path => "../test_snapshots",
    }, {
        insta::glob!("../test_data", "*/input.toml", |path| {
            let output = format_with_options(&path);
            insta::assert_binary_snapshot!(".toml", output.into_bytes());
        });
    });
}

fn format_with_options(input_path: &Path) -> String {
    let mut input = String::new();
    File::open(input_path)
        .and_then(|mut file| file.read_to_string(&mut input))
        .unwrap();

    let mut options_string = String::new();
    let options_path = input_path.with_file_name("options.json");

    let _ = File::open(options_path).and_then(|mut file| file.read_to_string(&mut options_string));

    let options: OptionsIncomplete = serde_json::from_str(&options_string).unwrap_or_default();
    format_impl(&input, options)
}
