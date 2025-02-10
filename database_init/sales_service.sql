CREATE DATABASE sales_service;

\connect sales_service;

CREATE SCHEMA service;

CREATE SEQUENCE service.sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.sales(
    id INT PRIMARY KEY DEFAULT nextval('service.sales_id_seq'),
    customer_id INT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false
);

CREATE SEQUENCE service.sale_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE service.sale_status(
    id INT PRIMARY KEY DEFAULT nextval('service.sale_status_id_seq'),
    sale_id INT NOT NULL,
    status VARCHAR(31) NOT NULL,
    note VARCHAR(2047) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    CONSTRAINT sale_id_foreign_key
        FOREIGN KEY (sale_id)
        REFERENCES service.sales (id)
        ON DELETE SET NULL
);