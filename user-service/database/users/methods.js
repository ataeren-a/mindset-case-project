const { pool } = require('../../config/database');
const queries = require('./queries');

const createUser = async (body) => {
    let client;
    try {
        const bcrypt = require('bcrypt');
        
        const hashedPwd = await bcrypt.hash(body.pwd, 12);

        // I'm aware that this is not perfect but I don't want to bring in express-validator for such a small project; it's too costly in size
        if (!body.email || body.email.length < 5 || String(body.email).includes('@') == false || String(body.email).includes('.') == false || String(body.email).includes(' ') == true) {
            return 'email';
        }

        if (!body.pwd || body.pwd.length < 8) {
            return 'password';
        }

        if (!body.username || body.username.length === 0 || String(body.username).includes(' ')) {
            return 'username';
        }

        client = await pool.connect();

        const queryBody = [
            body.role_id,
            body.username,
            body.email,
            hashedPwd,
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

const login = async (body) => {
    let client;
    try {
        const bcrypt = require('bcrypt');

        client = await pool.connect();

        if (!body.username && !body.email) {
            return 'provide_credentials';
        }

        const query = await client.query(queries.FIND_BY_USERNAME_OR_EMAIL, [body.username || body.email]);

        if (query.rowCount > 0) {
            const pwdMatch = await bcrypt.compare(body.pwd, query.rows[0].pwd);

            if (!pwdMatch) {
                return false;
            }

            const { generateToken } = require('../../helpers/jwt');
            const token = generateToken(
                {
                    id: query.rows[0].id,
                    role_id: query.rows[0].role_id,
                    username: query.rows[0].username,
                    email: query.rows[0].email
                }
            );

            return token;
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

const readUser = async (params) => {
    let client;
    try {
        client = await pool.connect();
        const query = await client.query(queries.READ_USER, [params.id]);
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

const readAllUsers = async (body) => {
    let client = await pool.connect();
    try {
        if (body.is_deleted === null || body.is_deleted === undefined) {
            const query = await client.query(queries.READ_ALL_USERS);
            return query.rows;
        } else if (body.is_deleted === true || body.is_deleted === false) {
            const query = await client.query(queries.READ_ALL_USERS_CONDITIONALLY, [body.is_deleted]);
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

const updateUser = async (body, params) => {
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

const deleteUser = async (params) => {
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
    createUser,
    login,
    readUser,
    readAllUsers,
    updateUser,
    deleteUser,
}