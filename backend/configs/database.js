const mysql = require('mysql2');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'delivery-app'
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;