const connectionManager = require('./connectionManager');

module.exports = {
   getAll,
   add,
   getById,
   deleteById
}

async function getAll(){
   const query = 'SELECT ID, name FROM enveloppe ORDER BY name ASC';
   
   const results = await connectionManager.query(query);

   return results.map(r => ({
      id: r.ID,
      name: r.name
   }));
}

async function add(name){
   const query = 'INSERT INTO enveloppe SET ?';
   const params = { name };

   const r = await connectionManager.query(query, params);

   return {
      id: r.insertId,
      name: name
   }
}

async function getById(id){
   const query = 'SELECT ID, name FROM enveloppe WHERE ID = ?';

   const r = await connectionManager.query(query, [id]);

   if (r.length === 0) return null;

   return {
      id: r[0].ID,
      name: r[0].name
   };
}

async function deleteById(id){
   const query = 'DELETE FROM enveloppe WHERE ID = ?';

   await connectionManager.query(query, [id]);
}