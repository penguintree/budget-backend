const dotenv = require('dotenv-flow');
dotenv.config();

module.exports = {
   serverPort: process.env.SERVER_PORT,
   corsOrigin: process.env.CORS_ORIGIN,
   sqlHost: process.env.SQL_HOST,
   sqlUser: process.env.SQL_USER,
   sqlPassword: process.env.SQL_PASSWORD,
   sqlDatabaseName: process.env.SQL_DATABASE_NAME
};