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
use serde_derive::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct NameQuery {
    pub name_set_id: i64,
    pub sex_id: i64,
}

#[derive(Serialize, Deserialize)]
pub struct Name {
    pub id: i64,
    pub latin_character_forms: Vec<String>,
    pub native_script_forms: Option<Vec<String>>,
    pub name_set_id: i64,
    pub sex_id: i64,
    pub type_id: i64,
}

#[derive(Serialize, Deserialize)]
pub struct Sex {
    pub id: i64,
    pub name: String,
}

#[derive(Serialize, Deserialize)]
pub struct NameSet {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
}
