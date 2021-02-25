const dotenv = require('dotenv');
dotenv.config();

module.exports = {
   serverPort: process.env.SERVER_PORT,
   sqlHost: process.env.SQL_HOST,
   sqlPassword: process.env.SQL_PASSWORD,
   sqlDatabaseName: process.env.SQL_DATABASE_NAME
};