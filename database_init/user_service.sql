CREATE DATABASE user_service;

\connect user_service;

CREATE SCHEMA service;

CREATE SEQUENCE service;

CREATE SEQUENCE service.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.user_roles(
    id INT PRIMARY KEY DEFAULT nextval('service.role_id_seq'),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false
);

INSERT INTO service.user_roles (name) VALUES('admin');
INSERT INTO service.user_roles (name) VALUES('sales_rep');

CREATE SEQUENCE service.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.users(
    id INT PRIMARY KEY DEFAULT nextval('service.user_id_seq'),
    role_id INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    pwd VARCHAR(255) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    CONSTRAINT role_id_foreign_key
        FOREIGN KEY (role_id)
        REFERENCES service.user_roles (id)
        ON DELETE SET NULL
);