const routingConfig = require('~/routingConfig');
const operationRepository = require('~/repositories/operationRepository');
const operationModel = require('~/models/operation.model');

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations',
   verb: 'get',
   handler: getAll
});
async function getAll(req, res) {
   const idEnveloppe = req.params.idEnveloppe;

   const operations = await operationRepository.getByEnveloppe(idEnveloppe);

   const readModel = operations.map(o => o.toReadModel());
   res.json(readModel);
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

   const readModel = operation.toReadModel();
   res.json(readModel);
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations',
   verb: 'post',
   handler: post
})
async function post(req, res) {
   const idEnveloppe = req.params.idEnveloppe;

   const writeModel = req.body;

   const operation = operationModel.operationFromPostModel(writeModel);
   const insertedOperation = await operationRepository.add(idEnveloppe, operation);

   const readModel = insertedOperation.toReadModel();
   res.json(readModel);
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

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/operations/:id',
   verb: 'put',
   handler: put
})
async function put(req, res) {
   const idEnveloppe = req.params.idEnveloppe;
   const id = req.params.id;

   const writeModel = req.body;

   const operation = await operationRepository.getById(idEnveloppe, id);
   if (operation === null) {
      res.status(404);
      res.end();
      return;
   }

   operation.applyPutModel(writeModel);

   const updatedOperation = await operationRepository.update(idEnveloppe, operation);

   const readModel = updatedOperation.toReadModel();
   res.json(readModel);
}