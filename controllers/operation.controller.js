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

   const operations = await operationRepository.getById(idEnveloppe, id);

   res.json(operations);
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