var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 20,
    host: '192.168.239.251',
    user: 'admin',
    password: 'admin',
    database: 'contentmedia'
    // here you can set connection limits and so on
});

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