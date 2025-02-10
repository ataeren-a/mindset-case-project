const queries = {
    CREATE: {
        text: `INSERT INTO service.sale_status(
                sale_id,
                status,
                note
            ) VALUES ($1, $2, $3)
            RETURNING id;
        `
    },

    READ: {
        text: `SELECT * FROM service.sale_status
            WHERE sale_id = $1 AND is_deleted = false;
        `
    },

    UPDATE_NOTE: {
        text: `UPDATE service.sale_status 
            SET updated_on = '${new Date().toLocaleString()}', note = $2
            WHERE id = $1
            RETURNING id;
        `
    },

    DELETE: {
        text: `UPDATE service.sale_status
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    },

    DELETE_ALL_STATUS: {
        text: `UPDATE service.sale_status
            SET is_deleted = true
            WHERE sale_id = $1 AND is_deleted = false;
        `
    }
}

module.exports = queries;