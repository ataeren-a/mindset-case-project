const queries = require('./queries');
const { pool } = require('../../config/database');

const createStatus = async (body) => {
    let client = await pool.connect();
    try {
        const pipeline = require('../../config/salesPipeline');

        if (Object.values(pipeline).includes(body.status) === false) {
            return false;
        }

        // we soft-delete the old sale status so that the new one is the active one
        await client.query(queries.DELETE_ALL_STATUS, [body.sale_id]);

        const queryBody = [
            body.sale_id,
            body.status,
            body.note,
        ];
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

const readStatus = async (params) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.READ, [params.sale_id]);

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

const updateStatusNote = async (body, params) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.UPDATE_NOTE, [params.id, body.note]);

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

const deleteStatus = async (params) => {
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
    createStatus,
    readStatus,
    updateStatusNote,
    deleteStatus,
};