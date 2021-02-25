const mysql = require('mysql');
const appSettings = require('~/appSettings');

const poolConfig = {
   connectionLimit: 10,
   host: appSettings.sqlHost,
   user: appSettings.sqlUser,
   password: appSettings.sqlPassword,
   database: appSettings.sqlDatabaseName
};

class ConnectionManager{
   constructor(){
      this._pool = mysql.createPool(poolConfig);
   }

   query(statement) {
      return new Promise((resolve, reject) => {
         this._pool.query(statement, (error, results /*, fields*/) => {
            if (error) {
               reject(error);
               return;
            }

            resolve(results);
         });
      });
   }
}

module.exports = new ConnectionManager();