mod storage;

use std::path::PathBuf;
use std::sync::Mutex;

use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager, State, WindowEvent,
};

struct Storage {
    connection: Mutex<rusqlite::Connection>,
    path: PathBuf,
}

#[tauri::command]
fn storage_probe(storage: State<Storage>) -> Result<storage::StorageProbe, String> {
    let connection = storage
        .connection
        .lock()
        .map_err(|error| error.to_string())?;
    storage::probe(&connection, &storage.path).map_err(|error| error.to_string())
}

fn show_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.unminimize();
        let _ = window.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let directory = app.path().app_data_dir()?;
            std::fs::create_dir_all(&directory)?;
            let connection = storage::open(&directory)?;
            storage::record_launch(&connection)?;
            app.manage(Storage {
                connection: Mutex::new(connection),
                path: storage::database_path(&directory),
            });

            let show = MenuItem::with_id(app, "show", "Show Righteo", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quit Righteo", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show, &quit])?;

            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .icon_as_template(true)
                .menu(&menu)
                .show_menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "show" => show_main_window(app),
                    "quit" => app.exit(0),
                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| {
            // Closing hides rather than quits: the hub keeps running behind the tray.
            if let WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.hide();
            }
        })
        .invoke_handler(tauri::generate_handler![storage_probe])
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app, event| {
            if let tauri::RunEvent::Reopen { .. } = event {
                show_main_window(app);
            }
        });
}
