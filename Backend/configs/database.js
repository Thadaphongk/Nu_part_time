const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'jon_nu',
    charset: 'utf8'
});

module.exports = connection;