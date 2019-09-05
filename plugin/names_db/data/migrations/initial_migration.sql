CREATE TABLE name_type (
    id BIGSERIAL NOT NULL CONSTRAINT name_type_pk PRIMARY KEY,
    name TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    meta JSON
);
CREATE UNIQUE INDEX name_type_id_uindex ON name_type (id);


CREATE TABLE sex (
    id BIGSERIAL NOT NULL CONSTRAINT sex_pk PRIMARY KEY,
    name TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    meta JSON
);
CREATE UNIQUE INDEX sex_id_uindex ON sex (id);


CREATE TABLE name_set (
    id BIGSERIAL NOT NULL CONSTRAINT name_set_pk PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    meta JSON
);
CREATE UNIQUE INDEX name_set_id_uindex ON name_set (id);
CREATE UNIQUE INDEX name_set_name_uindex ON name_set (name);


CREATE TABLE name (
    id BIGSERIAL NOT NULL CONSTRAINT name_pk PRIMARY KEY,
    latin_character_forms TEXT[] NOT NULL,
    native_script_forms TEXT[],
    name_set_id BIGSERIAL NOT NULL CONSTRAINT name_name_set_id_fk REFERENCES name_set,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated TIMESTAMP DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    meta JSON,
    sex_id BIGSERIAL NOT NULL CONSTRAINT name_sex_id_fk REFERENCES sex,
    type_id BIGSERIAL NOT NULL CONSTRAINT name_name_type_id_fk REFERENCES name_TYPE
);
CREATE UNIQUE INDEX name_id_uindex ON name (id);
CREATE INDEX name_name_set_id_index ON name (name_set_id);
CREATE INDEX name_sex_id_index ON name (sex_id);
CREATE INDEX name_type_id_index ON name (type_id);


CREATE VIEW name_presentation(id, latin_character_forms, native_script_forms, name_set_id, sex_id, type_id) AS
SELECT name.id,
       name.latin_character_forms,
       name.native_script_forms,
       name.name_set_id,
       name.sex_id,
       name.type_id
FROM name
WHERE (name.deleted = false);

CREATE VIEW name_set_presentation(id, name, description) AS
SELECT name_set.id,
       name_set.name,
       name_set.description
FROM name_set
WHERE (name_set.deleted = false);

CREATE VIEW sex_presentation(id, name) AS
SELECT sex.id,
       sex.name
FROM sex
WHERE (sex.deleted = false);
