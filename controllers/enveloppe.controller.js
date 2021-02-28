const routingConfig = require('~/routingConfig');
const enveloppeRepository = require('~/repositories/enveloppeRepository');

routingConfig.register({
   route: '/enveloppes',
   verb: 'get',
   handler: getAll
});
async function getAll(req, res){
   const enveloppes = await enveloppeRepository.getAll();
   res.json(enveloppes);
}

routingConfig.register({
   route: '/enveloppes',
   verb: 'post',
   handler: post
});
async function post(req, res){
   const writeModel = req.body;

   const enveloppe = await enveloppeRepository.add(writeModel.name);

   res.status(201).json(enveloppe);
}

routingConfig.register({
   route: '/enveloppes/:id',
   verb: 'get',
   handler: get
});
async function get(req, res){
   const id = req.params.id;

   const enveloppe = await enveloppeRepository.getById(id);

   if(enveloppe === null) {
      res.status(404).end();
      return;
   } 

   res.json(enveloppe);
}

routingConfig.register({
   route: '/enveloppes/:id',
   verb: 'delete',
   handler: deleteById
});
async function deleteById(req, res){
   const id = req.params.id;

   await enveloppeRepository.delete(id);

   res.status(204).end();
}

routingConfig.register({
   route : '/enveloppes/:id',
   verb: 'put',
   handler: put
});
async function put(req, res){
   const id = req.params.id;
   const writeModel = req.body;

   const enveloppe = await enveloppeRepository.get(id);
   if (enveloppe === null) {
      res.status(404).end();
      return;
   }

   enveloppe.name = writeModel.name;
   await enveloppeRepository.update(enveloppe);

   res.status(204).end();
}

module.exports = 'enveloppeController';