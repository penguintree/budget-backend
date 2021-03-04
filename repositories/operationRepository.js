const connectionManager = require('./connectionManager');
const arrayUtils = require('~/arrayUtils');

module.exports = {
   getByEnveloppe,
   getById,
   add,
   delete: $delete,
   update
};

const baseQuery = 
   `SELECT 
      o.ID as opId, 
      o.name as name, 
      o.date AS 'date',
      d.ID as detId,
      d.description as description,
      d.amount as amount,
      d.ID_category as categoryId
    FROM operation o
    JOIN operation_details d
      ON o.ID = d.ID_operation `;

async function getByEnveloppe(idEnveloppe){
   const query = 
   `${baseQuery}
   WHERE o.ID_enveloppe = ? `;

   const params = [idEnveloppe];

   const results = await connectionManager.query(query, params);

   return mapResults(results);
}

async function getById(idEnveloppe, id) {
   const query =
   `${baseQuery}
   WHERE o.ID_enveloppe = ? 
     AND o.ID = ?`;
   
   const params = [idEnveloppe, id];

   const results = await connectionManager.query(query, params);

   return mapResults(results)[0] ?? null;
}

async function add(idEnveloppe, operation) {
   const results = await connectionManager.useTransaction(
      async (connection) => {
         const query = 
         `INSERT INTO operation
         (ID_enveloppe, name, date)
         VALUES (?, ?, DATE(?))`;
         const params = [+idEnveloppe, operation.name, operation.date];

         const result = await connection.query(query, params);

         return [result.insertId];
      },
      async (connection, idOperation) => {
         let query = 
         `INSERT INTO operation_details
         (ID_operation, ID_category, description, amount)
         VALUES `;

         const valuesRows = [];
         const params = [];
         for (let od of operation.details) {
            valuesRows.push(`(?, ?, ?, ?)`);
      
            params.push(idOperation, od.categoryId, od.description, od.amount);
         };
      
         query += valuesRows.join(', ');

         await connection.query(query, params);

         return [idOperation];
      },
      async(connection, idOperation) => {
         const query = 
         `${baseQuery}
         WHERE o.ID = ?`;
         const params = [ idOperation ];

         return await connection.query(query, params);
      }
   );

   return mapResults(results);
}

async function $delete(idEnveloppe, id) {
   const query = 'DELETE FROM operation WHERE ID_enveloppe = ? AND id = ?';
   const params = [ idEnveloppe, id ];

   await connectionManager.query(query, params);
}

async function update(idEnveloppe, operation) {
   const updatedResult = await connectionManager.useTransaction(
      // update operation's head.
      async(connection) => {
         const query =
         `UPDATE operation
             SET name = ?, date = DATE(?)
           WHERE ID_enveloppe = ?
             AND ID = ?`;
         const params = [ operation.name, operation.date, idEnveloppe, operation.id ];

         await connection.query(query, params);
      },
      // Delete removed details.
      async (connection) => {
         const idDetails = operation.details.filter(d => d.id !== undefined && d.id !== null).map(d => d.id);
         let query = 
         `DELETE FROM operation_details
           WHERE ID_operation = ? `;
         if (idDetails.length > 0) {
             query += `AND ID NOT IN (${idDetails.map(() => '?').join(',')})`;
         }
         const params = [ operation.id, ...idDetails ];

         await connection.query(query, params);
      },
      // Insert new details.
      async (connection) => {
         const newDetails = operation.details.filter(d => d.id === undefined || d.id === null);
         if (newDetails.length === 0) return;

         let query = 
         `INSERT INTO operation_details
         (ID_operation, ID_category, description, amount)
         VALUES `;

         const valuesRows = [];
         const params = [];
         for (let od of newDetails) {
            valuesRows.push(`(?, ?, ?, ?)`);
      
            params.push(operation.id, od.categoryId, od.description, od.amount);
         };
      
         query += valuesRows.join(', ');

         await connection.query(query, params);
      },
      // Update existant details
      async (connection) => {
         const existingDetails = operation.details.filter(d => d.id !== undefined && d.id !== null);
         if (existingDetails.length === 0) return;

         const updateStatements = [];
         const params = [];
         for (let od of existingDetails) {
            updateStatements.push(
               `UPDATE operation_details
                   SET ID_category = ?, description = ?, amount = ?
                 WHERE ID_operation = ?
                   AND ID = ?`
            );
            params.push(od.categoryId, od.description, od.amount, operation.id, od.id);
         }

         const query = updateStatements.join('\n;\n');

         await connection.query(query, params);
      },
      // Read updated operation.
      async (connection) => {
         let query = 
         `${baseQuery}
         WHERE o.ID_enveloppe = ?
           AND o.ID = ?`
         
         const params = [ idEnveloppe, operation.id ];

         const result = await connection.query(query, params);

         return result;
      }
   );

   return mapResults(updatedResult)[0];
}

function mapResults(results){
   groupedByOperation = arrayUtils.groupBy(results, r => r.opId, r => r);
   if(results.length === 0) return [];

   const operations = [];
   for (let idOp in groupedByOperation) {
      const data = groupedByOperation[idOp];

      const op = {
         id: idOp,
         name: data[0].name,
         date: data[0].date
      };

      op.details = data.map( d => ({
         id: d.detId,
         description: d.description,
         amount: d.amount,
         categoryId: d.categoryId
      }));

      operations.push(op);
   }

   return operations;
}