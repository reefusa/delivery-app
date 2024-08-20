const mysql = require('mysql2');

// const dbConfig = {
//     host: 'localhost',
//     user: 'p-344028_alnapa',
//     password: '64e-2Cy-R7u-K7U',
//     database: 'p-344028_alnapa'
// }

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'delivery-app'
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;