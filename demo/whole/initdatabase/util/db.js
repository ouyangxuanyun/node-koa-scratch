const mysql = require('mysql');
const dbConfig = require('../../config.js').database;

const pool = mysql.createPool({
    host     :  dbConfig.HOST,
    user     :  dbConfig.USERNAME,
    password :  dbConfig.PASSWORD,
    database :  dbConfig.DATABASE
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};

module.exports = {
    query
}