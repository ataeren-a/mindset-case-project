const queries = require('./queries');
const { pool } = require('../../config/database');

const createNote = async (body) => {
    let client;
    try {
        const queryBody = [
            body.customer_id,
            body.note,
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

const readNotes = async (params) => {
    let client = await pool.connect();
    try {
        const query = await client.query(queries.READ, [params.customer_id]);

        if (query.rowCount > 0) {
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

const updateNote = async (body, params) => {
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

const deleteNote = async (params) => {
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
    createNote,
    readNotes,
    updateNote,
    deleteNote
};