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

use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};
use r2d2_postgres::{PostgresConnectionManager, TlsMode};
use serde_derive::{Deserialize, Serialize};
use std::env;

type Pool = r2d2::Pool<PostgresConnectionManager>;
type Connection = r2d2::PooledConnection<PostgresConnectionManager>;

#[derive(Serialize, Deserialize)]
struct NameData {
    latin_name: String,
    native_name: Option<String>,
    set: String,
    name_type: String,
    sex: String,
}

fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

fn data_test(db: web::Data<Pool>) -> impl Responder {
    let conn: Connection = db.get().unwrap();

    let statement = "SELECT * FROM denormalized_name_alt LIMIT 250";

    let result: Vec<NameData> = conn
        .query(statement, &[])
        .unwrap()
        .into_iter()
        .map(|row| {
            let latin_name: String = row.get(0);
            let native_name: Option<String> = row.get(1);
            let set: String = row.get(2);
            let name_type: String = row.get(3);
            let sex: String = row.get(4);

            NameData {
                latin_name,
                native_name,
                set,
                name_type,
                sex,
            }
        })
        .collect();

    HttpResponse::Ok().json(result)
}

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
            .service(web::resource("/data").route(web::get().to(data_test)))
    })
    .bind(&address)
    .unwrap()
    .run()
    .unwrap();
}
