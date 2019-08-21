/* This file is a part of Names DB
 *
 * Names DB is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Names DB is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Names DB. If not, see <https://www.gnu.org/licenses/>.
 */
extern crate r2d2;
extern crate r2d2_postgres;

use crate::models::{Name, NameSet, Sex};

use postgres::rows::Row;
use r2d2_postgres::PostgresConnectionManager;

// Define some types for convenience, otherwise it's a lot to type
pub type Pool = r2d2::Pool<PostgresConnectionManager>;
pub type Connection = r2d2::PooledConnection<PostgresConnectionManager>;

pub fn get_names(conn: Connection, name_set_id: i64, sex_id: i64) -> Vec<Name> {
    let statement = "
        SELECT *
        FROM name_presentation
        WHERE type_id = 1
        AND name_set_id = $1
        AND sex_id IN ($2, 3)
    ";

    conn.query(statement, &[&name_set_id, &sex_id])
        .unwrap()
        .into_iter()
        .map(row_to_name)
        .collect()
}

pub fn get_name_sets(conn: Connection) -> Vec<NameSet> {
    let statement = "SELECT * FROM name_set_presentation";

    conn.query(statement, &[])
        .unwrap()
        .into_iter()
        .map(row_to_name_set)
        .collect()
}

pub fn get_sexes(conn: Connection) -> Vec<Sex> {
    let statement = "SELECT * FROM sex_presentation";

    conn.query(statement, &[])
        .unwrap()
        .into_iter()
        .map(row_to_sex)
        .collect()
}

fn row_to_name(row: Row) -> Name {
    let id: i64 = row.get("id");
    let latin_character_forms: Vec<String> = row.get("latin_character_forms");
    let native_script_forms: Option<Vec<String>> = row.get("native_script_forms");
    let name_set_id: i64 = row.get("name_set_id");
    let sex_id: i64 = row.get("sex_id");
    let type_id: i64 = row.get("type_id");

    Name {
        id,
        latin_character_forms,
        native_script_forms,
        name_set_id,
        sex_id,
        type_id,
    }
}

fn row_to_name_set(row: Row) -> NameSet {
    let id: i64 = row.get("id");
    let name: String = row.get("name");
    let description: Option<String> = row.get("description");

    NameSet {
        id,
        name,
        description,
    }
}

fn row_to_sex(row: Row) -> Sex {
    let id: i64 = row.get("id");
    let name: String = row.get("name");

    Sex { id, name }
}
