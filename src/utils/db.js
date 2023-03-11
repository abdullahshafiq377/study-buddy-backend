// Import Statements
const mysql = require("mysql2/promise");

// Creating the connection to database
async function paraQuery(q, para) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true

    // timezone: 'utc+5'
  });
  const [rows, fields] = await connection.execute(q, para);
  connection.end();
  return rows;
}


async function multiQuery(q, para) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
    // timezone: 'utc+5'
  });
  connection.query(q, para, function(error, results, fields) {
    if (error) {
      throw error;
    }
    return results;
  });
  connection.end();
}

module.exports = paraQuery, multiQuery;
