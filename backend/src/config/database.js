const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool(process.env.DB_URL);

pool.getConnection(async (err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  await connection.promise().query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("MySQL connected successfully");
  connection.release();
});

module.exports = pool.promise();