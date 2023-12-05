const mysql = require('mysql');

const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '41690249',
 database: 'tp_db_rk'
});

db.connect((err) => {
 if (err) {
    throw err;
 }
 console.log('Conexión exitosa a la base de datos');
});

module.exports = db;