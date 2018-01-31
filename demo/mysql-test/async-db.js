const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_database'
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                conn.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    conn.release();
                })
            }
        })
    })
};

module.exports = {query};
