const connectionManager = require('./connectionManager');

module.exports = {
   get,
   add,
   update,
   delete: $delete
};

async function get(idEnveloppe){
   const query = 'SELECT ID, name FROM category WHERE ID_enveloppe = ?';
   const params = [idEnveloppe];

   const result = await connectionManager.query(query, params);

   return result.map(r => ({
      id: r.ID,
      name: r.name
   }));
}

async function add(idEnveloppe, { name }) {
   const query = 
   `INSERT INTO category
    SET ID_enveloppe = ?, name = ?`;
   
   const params = [idEnveloppe, name];

   const result = await connectionManager.query(query, params);

   return {
      id: result.insertId,
      name: name
   }
}

async function update(idEnveloppe, { id, name }) {
   const query =
   `UPDATE category
    SET name = ?
    WHERE ID_Enveloppe = ?
    AND id = ?`;
   
   const params = [name, idEnveloppe, id];

   await connectionManager.query(query, params);
}

async function $delete(idEnveloppe, id) {
   const query = 'DELETE FROM category WHERE ID_enveloppe = ? AND id = ?';
   const params = [idEnveloppe, id];

   await connectionManager.query(query, params);
}