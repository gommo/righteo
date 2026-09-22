use rusqlite::Connection;
use serde::Serialize;
use std::path::{Path, PathBuf};

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StorageProbe {
    pub database_path: String,
    pub launches: u32,
    pub first_launch: String,
    pub latest_launch: String,
}

pub fn database_path(dir: &Path) -> PathBuf {
    dir.join("righteo.db")
}

pub fn open(dir: &Path) -> rusqlite::Result<Connection> {
    let connection = Connection::open(database_path(dir))?;
    connection.pragma_update(None, "journal_mode", "WAL")?;
    connection.execute_batch(
        "CREATE TABLE IF NOT EXISTS launch (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            at TEXT NOT NULL DEFAULT (datetime('now'))
        );",
    )?;
    Ok(connection)
}

pub fn record_launch(connection: &Connection) -> rusqlite::Result<()> {
    connection.execute("INSERT INTO launch DEFAULT VALUES", [])?;
    Ok(())
}

pub fn probe(connection: &Connection, path: &Path) -> rusqlite::Result<StorageProbe> {
    connection.query_row(
        "SELECT COUNT(*), COALESCE(MIN(at), ''), COALESCE(MAX(at), '') FROM launch",
        [],
        |row| {
            Ok(StorageProbe {
                database_path: path.display().to_string(),
                launches: row.get(0)?,
                first_launch: row.get(1)?,
                latest_launch: row.get(2)?,
            })
        },
    )
}
