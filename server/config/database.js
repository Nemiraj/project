import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u704095519_Rasheedtreksb',
  password: process.env.DB_PASSWORD || 'Treksbe@2026',
  database: process.env.DB_NAME || 'u704095519_Treaksbe',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    console.error('\n⚠️  Troubleshooting steps:');
    console.error('1. Make sure MySQL/MariaDB server is running');
    console.error('2. Check your .env file in the server directory');
    console.error('3. Verify database credentials (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)');
    console.error('4. Create the database if it doesn\'t exist:');
    console.error('   - Open phpMyAdmin (http://localhost/phpmyadmin)');
    console.error('   - Create database: real_estate_db');
    console.error('   - Import schema.sql file\n');
  });

export default pool;

