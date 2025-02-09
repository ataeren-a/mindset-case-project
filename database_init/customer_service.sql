CREATE DATABASE customer_service;

\connect customer_service;

CREATE SCHEMA service;

CREATE SEQUENCE service.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.customers(
    id INT PRIMARY KEY DEFAULT nextval('service.customer_id_seq'),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false
);

CREATE SEQUENCE service.customer_note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.customer_notes(
    id INT PRIMARY KEY DEFAULT nextval('service.customer_note_id_seq'),
    customer_id INT NOT NULL,
    note VARCHAR(2047) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    CONSTRAINT customer_id_foreign_key
        FOREIGN KEY (customer_id)
        REFERENCES service.customers (id)
        ON DELETE SET NULL
);