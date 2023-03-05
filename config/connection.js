// Import the mysql2 module
const mysql = require('mysql2');

// Create a connection to the MySQL database with the given configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Freebird4257!',
  database: 'employees_db'
});

// Connect to the MySQL database and log a message if successful
connection.connect((err) => {
  if (err) throw err;
  console.log('Connection successful!');
});

// Export the connection object for use in other modules
module.exports = connection;

