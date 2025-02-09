const queries = {
    CREATE: {
        text: `INSERT INTO service.users (
                role_id,
                username,
                email,
                pwd
            ) VALUES ($1, $2, $3, $4)
            RETURNING id;
        `
    },

    FIND_BY_USERNAME_OR_EMAIL: {
        text: `SELECT id, role_id, username, email, pwd FROM service.users
            WHERE (username = $1 OR email = $1) AND is_deleted = false;
        `
    },

    READ_USER: {
        text: `SELECT 
                id, 
                role_id, 
                username, 
                email,
                created_on,
                updated_on,
                is_deleted
            FROM service.users
            WHERE id = $1;
        `
    },

    READ_ALL_USERS: {
        text: `SELECT 
                id, 
                role_id, 
                username, 
                email,
                created_on,
                updated_on,
                is_deleted
            FROM service.users
            ORDER BY id ASC;
        `
    },

    READ_ALL_USERS_CONDITIONALLY: {
        text: `SELECT 
                id, 
                role_id, 
                username, 
                email,
                created_on,
                updated_on,
                is_deleted
            FROM service.users
            WHERE is_deleted = $1
            ORDER BY id ASC;
        `
    },

    UPDATE: (id, cols) => {
        let query = ['UPDATE service.users'];
        query.push('SET');
    
        let set = [];

        const keys = Object.keys(cols);

        for (let i = 0; i < keys.length; ++i) {
            set.push(keys[i] + ' = $' + (i + 1));
        }

        query.push(set + `, updated_on = '${new Date().toLocaleString()}' ` + ' WHERE id = ' + id + ' RETURNING id;');
    
        return query.join(' ');
    },

    DELETE: {
        text: `UPDATE service.users
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    }
}

module.exports = queries;