const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Freebird4257!',
  database: 'employees_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connection successful!');
});

module.exports = connection;

