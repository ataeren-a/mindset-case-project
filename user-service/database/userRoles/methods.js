const { pool } = require('../../config/database');
const queries = require('./queries');

const createRole = async (body) => {
    let client;
    try {
        client = await pool.connect();
        const query = await client.query(queries.CREATE, [body.name]);
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

const readAllRoles = async (body) => {
    let client;
    try {
        if (body.is_deleted === null || body.is_deleted === undefined) {
            client = await pool.connect();
            const query = await client.query(queries.READ_ALL);
            return query.rows;
        } else if (body.is_deleted === true || body.is_deleted === false) {
            client = await pool.connect();
            const query = await client.query(queries.READ_WITH_DELETED_CONDITION, [body.is_deleted]);
            return query.rows;
        } else {
            return 'invalid_body';
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        if (client) {
            client.release();
        }
    }
}

const readRole = async (params) => {
    let client;
    try {
        client = await pool.connect();
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

const findRole = async (params) => {
    let client;
    try {
        client = await pool.connect();
        const query = await client.query(queries.FIND, [params.name]);
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

const updateRole = async (body, params) => {
    let client;
    try {
        client = await pool.connect();

        const queryBody = [
            params.id,
            body.name,
            new Date()
        ];
        const query = await client.query(queries.UPDATE, queryBody);
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

const deleteRole = async (params) => {
    let client;
    try {
        client = await pool.connect();
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
    createRole,
    readRole,
    readAllRoles,
    findRole,
    updateRole,
    deleteRole,
}