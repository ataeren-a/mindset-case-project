const queries = {
    CREATE: {
        text: `INSERT INTO service.sales(
                customer_id
            ) VALUES ($1)
            RETURNING id;
        `
    },

    READ: {
        text: `SELECT * FROM service.sales
            WHERE id = $1;
        `
    },

    READ_ALL: {
        text: `SELECT * FROM service.sales
            ORDER BY id ASC;
        `
    },

    READ_ALL_CONDITIONALLY: {
        text: `SELECT * FROM service.sales
            WHERE is_deleted = $1
            ORDER BY id ASC;
        `
    },

    UPDATE: (id, cols) => {
        let query = ['UPDATE service.sales'];
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
        text: `UPDATE service.sales
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    }
}

module.exports = queries;