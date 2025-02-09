const queries = {
    CREATE: {
        text: `INSERT INTO service.customers(
                firstname,
                lastname,
                email,
                phone,
                company
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        ` 
    },

    READ: {
        text: `SELECT * FROM service.customers
            WHERE id = $1;
        `
    },

    READ_ALL: (filter, order) => {
        let query = ['SELECT * FROM service.customers'];
        let where = [];
        if (filter) {
            const keys = Object.keys(filter);
            for (let i = 0; i < keys.length; ++i) {
                where.push((i == 0 ? 'WHERE ' : ' AND ') + keys[i] + ' = $' + (i + 1));
            }
        }

        let orderBy = [];
        if (order) {
            orderBy.push(String(orderBy).concat(` ORDER BY ${order.by} ${order.asc ? 'ASC' : 'DESC'}`));
        }

        query.push(where || '' , orderBy || '', ';');

        return query.join(' ');
    },

    UPDATE: (id, cols) => {
        let query = ['UPDATE service.customers'];
        query.push('SET');
    
        let set = [];

        const keys = Object.keys(cols);

        for (let i = 0; i < keys.length; ++i) {
            set.push(keys[i] + ' = $' + (i + 1));
        }

        query.push(set + ' WHERE id = ' + id + ' RETURNING id;');
    
        return query.join(' ');
    },

    DELETE: {
        text: `UPDATE service.customers
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    }

}

module.exports = queries;