const queries = require('./queries');
const { pool } = require('../../config/database');

const createSale = async (body) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.CREATE, [body.customer_id]);

        if (query.rowCount > 0) {
            // we should also create a status that indicates the sale is "new"
            const createStatus = require('../saleStatus/queries').CREATE;
            const createStatusBody = [
                query.rows[0].id,
                'new',
                null,
            ];
            await client.query(createStatus, createStatusBody);

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

const readSale = async (params) => {
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

const readAllSales = async (body) => {
    let client = await pool.connect();
    try {
        if (body.is_deleted === null || body.is_deleted === undefined) {
            const query = await client.query(queries.READ_ALL);
            return query.rows;
        } else if (body.is_deleted === false || body.is_deleted === true) {
            const query = await client.query(queries.READ_ALL_CONDITIONALLY, [body.is_deleted]);
            return query.rows;
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

const updateSale = async (body, params) => {
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

const deleteSale = async (params) => {
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
    createSale,
    readSale,
    readAllSales,
    updateSale,
    deleteSale,
};