const queries = require('./queries');
const { pool } = require('../../config/database');

const createCustomer = async (body) => {
    let client;
    try {
        const queryBody = [
            body.firstname,
            body.lastname,
            body.email,
            body.phone,
            body.company,
        ];

        client = await pool.connect();
        const query = await client.query(queries.CREATE, queryBody);

        if (query.rowCount > 0) {
            return query.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const readCustomer = async (params) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.READ, [params.id]);

        if (query.rowCount > 0) {
            return query.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const readAllCustomers = async (body) => {
    let client = await pool.connect();
    try {
        const queryText = queries.READ_ALL(body.filter, body.order);
        const values = Object.keys(body.filter).map((key) => body.filter[key]);

        const query = await client.query(queryText, values);

        return query.rows;
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const updateCustomer = async (body, params) => {
    let client;
    try {
        const queryText = queries.UPDATE(params.id, body);
        const values = Object.keys(body).map((key) => body[key]);

        client = await pool.connect();
        const query = await client.query(queryText, values);
        
        if (query.rowCount > 0) {
            return query.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const deleteCustomer = async (params) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.DELETE, [params.id]);

        if (query.rowCount > 0) {
            return query.rows[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    createCustomer,
    readCustomer,
    readAllCustomers,
    updateCustomer,
    deleteCustomer,
};