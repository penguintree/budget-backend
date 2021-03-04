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
      this._poolQuery = new AsyncQueryable(this._pool);
   }

   query(statement, values = []) {
      return this._poolQuery.query(statement, values);
   }

   useTransaction(...callstack) {
      return new Promise((resolve, reject) => {
         this._pool.getConnection((errGetConnection, connection) => {
            if (errGetConnection) {
               reject(errGetConnection);
               return;
            }

            connection.beginTransaction(async (errTrans) => {
               if (errTrans) {
                  reject(errTrans);
                  connection.release();
                  return;
               }

               const queryable = new AsyncQueryable(connection);
               let params = [];
               for (let call of callstack) {
                  try {
                     params = await call(queryable, ...(params || []));
                  } catch (errQuery) {
                     reject(errQuery);
                     connection.rollback();
                     connection.release();
                     return;
                  }
               }

               resolve(params);
               connection.release();
            });
         });
      });
   }
}

class AsyncQueryable {
   constructor(queryable) {
      this._queryable = queryable;
   }

   query (query, params) {
      return new Promise((resolve, reject) => {
         this._queryable.query(query, params, (error, result) => {
            if (error) {
               reject(error);
            } else {
               resolve(result);
            }
         });
      });
   }
}

module.exports = new ConnectionManager();