const routingConfig = require('~/routingConfig');
const operationRepository = require('~/repositories/operationRepository');

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations',
   verb: 'get',
   handler: getAll
});
async function getAll(req, res) {
   const idEnveloppe = req.params.idEnveloppe;

   const operations = await operationRepository.getByEnveloppe(idEnveloppe);

   res.json(operations);
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations/:id',
   verb: 'get',
   handler: getById
})
async function getById(req, res) {
   const idEnveloppe = req.params.idEnveloppe;
   const id = req.params.id;

   const operation = await operationRepository.getById(idEnveloppe, id);

   if (operation === null) {
      res.status(404);
      res.end();
      return;
   }

   res.json(operation);
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations',
   verb: 'post',
   handler: post
})
async function post(req, res) {
   const idEnveloppe = req.params.idEnveloppe;

   const writeModel = req.body;

   const operations = await operationRepository.add(idEnveloppe, writeModel);

   res.json(operations);
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations/:id',
   verb: 'delete',
   handler: $delete
});
async function $delete(req, res) {
   const idEnveloppe = req.params.idEnveloppe;
   const id = req.params.id;

   await operationRepository.delete(idEnveloppe, id);

   res.status(204).end();
}