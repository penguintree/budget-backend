const connectionManager = require('./connectionManager');

module.exports = {
   getAll
}

async function getAll(){
   const query = 'SELECT ID, name FROM enveloppe ORDER BY name ASC';
   
   const results = await connectionManager.query(query);

   return results.map(r => ({
      id: r.ID,
      name: r.name
   }));
}