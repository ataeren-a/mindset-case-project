const queries = {
    CREATE: {
        text: `INSERT INTO service.customer_notes(
                customer_id,
                note
            ) VALUES ($1, $2)
            RETURNING id;
        ` 
    },

    READ: {
        text: `SELECT * FROM service.customer_notes
            WHERE customer_id = $1
            ORDER BY id DESC;
        `
    },

    UPDATE: (id, cols) => {
        let query = ['UPDATE service.customer_notes'];
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
        text: `UPDATE service.customer_notes
            SET is_deleted = true
            WHERE id = $1
            RETURNING id;
        `
    }

}

module.exports = queries;