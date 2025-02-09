const queries = {
    CREATE: {
        text: `INSERT INTO service.user_roles(
                name
            ) VALUES (
                $1
            ) RETURNING id;
        `
    },

    READ_ALL: {
        text: `SELECT * FROM service.user_roles 
            ORDER BY id ASC;
        `
    },

    READ_WITH_DELETED_CONDITION: {
        text: `SELECT * FROM service.user_roles
            WHERE is_deleted = $1
            ORDER BY id ASC;
        `
    },

    READ: {
        text: `SELECT * FROM service.user_roles
            WHERE id = $1;
        `
    },

    FIND: {
        text: `SELECT * FROM service.user_roles
            WHERE name = $1;
        `
    },

    UPDATE: {
        text: `UPDATE service.user_roles
            SET name = $2, created_on = $3
            WHERE id = $1
            RETURNING id;
        `
    },

    DELETE: {
        text: `UPDATE service.user_roles
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    },
}

module.exports = queries;