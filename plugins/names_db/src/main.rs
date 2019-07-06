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

mod models;

mod db;
use db::Pool;

mod controllers;
use controllers::{index, name_sets, names, sexes};

use actix_web::{middleware, web, App, HttpServer};
use r2d2_postgres::{PostgresConnectionManager, TlsMode};
use std::env;

fn main() {
    env::set_var("RUST_LOG", "actix_web=info");
    let address = match env::var("NAMES_DB_ADDRESS") {
        Ok(val) => val,
        Err(_e) => panic!("No address was defined, the server cannot start. Exiting"),
    };
    let db_address = match env::var("NAMES_DB_DB_ADDRESS") {
        Ok(val) => val,
        Err(_e) => panic!("No connection information defined for the database. Exiting"),
    };

    let manager = PostgresConnectionManager::new(db_address, TlsMode::None).unwrap();
    let pool: Pool = r2d2::Pool::new(manager).unwrap();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(web::resource("/").route(web::get().to(index)))
            .service(web::resource("/name").route(web::get().to(names)))
            .service(web::resource("/name_set").route(web::get().to(name_sets)))
            .service(web::resource("/sex").route(web::get().to(sexes)))
    })
    .bind(&address)
    .unwrap()
    .run()
    .unwrap();
}
