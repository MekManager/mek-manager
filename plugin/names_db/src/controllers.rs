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
use actix_web::{web, HttpResponse, Responder};

use crate::db::{get_name_sets, get_names, get_sexes, Connection, Pool};

use crate::models::NameQuery;

pub fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

pub fn names(query: web::Query<NameQuery>, db: web::Data<Pool>) -> impl Responder {
    let conn: Connection = db.get().unwrap();
    let result = get_names(conn, query.name_set_id, query.sex_id);

    if result.len() == 0 {
        HttpResponse::NotFound().body("records not found")
    } else {
        HttpResponse::Ok().json(result)
    }
}

pub fn sexes(db: web::Data<Pool>) -> impl Responder {
    let conn: Connection = db.get().unwrap();
    let result = get_sexes(conn);

    if result.len() == 0 {
        HttpResponse::NotFound().body("records not found")
    } else {
        HttpResponse::Ok().json(result)
    }
}

pub fn name_sets(db: web::Data<Pool>) -> impl Responder {
    let conn: Connection = db.get().unwrap();
    let result = get_name_sets(conn);

    if result.len() == 0 {
        HttpResponse::NotFound().body("records not found")
    } else {
        HttpResponse::Ok().json(result)
    }
}
