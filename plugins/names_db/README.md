# Names DB

Names DB is a tool for storing names by logical groupings, referred to as
`name_sets` and serving them through a public API. These sets are usually
cultural groupings from a time or place.  Names are also categorized by the type
of name they are, like a given name, and the sex that they are associated with.

## Usage

Names DB is backed by a PostgreSQL database. So one must be setup and accessible
to Names DB for it to work. Two environmental variables are required for the
server to start. `NAMES_DB_ADDRESS` and `NAMES_DB_DB_ADDRESS`.

`NAMES_DB_ADDRESS` is the port that the server should attach to, it should look
something like: `127.0.0.1:8088`

`NAMES_DB_DB_ADDRESS` is the PostgreSQL connection information, it should be in
the form of a connection URL like: `postgres://username:password@ip/name_api`

It's recommended to create a read-only role to connect with; the API doesn't do
any writing to the underlying database, so using a read-only user provides an
extra layer of security against SQL injection.

## Setup

Migrations and seed data forthcoming
