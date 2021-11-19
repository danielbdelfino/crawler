var mysql = require('mysql');
require('dotenv/config');

const pool = mysql.createPool({
    connectionLimit : 20,
    host: process.env.DB_URL,
    user: process.env.DB_USR,
    password: process.env.DB_PASSWD,
    database: 'contentmedia'
    // here you can set connection limits and so on
});

console.log(process.env.DB_URL + ' connection');

/// COLOCAR EM OUTRO FONTE
// const connection = require('../util/connection');

// async function getAll() {
//     const sql = "SELECT * FROM tableName";
//     const [rows] = await connection.promise().query(sql);
//     return rows;
// } 
// exports.getAll = getAll;

const getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

// module.exports = getConnection;

module.exports = {
    getConnection: getConnection
};