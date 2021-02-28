const routingConfig = require('~/routingConfig');
const categoryRepository = require('~/repositories/categoryRepository');

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/categories',
   verb: 'get',
   handler: getList
});
async function getList(req, res){
   const idEnveloppe = req.params.idEnveloppe;

   const categories = await categoryRepository.get(idEnveloppe);

   res.json(categories);
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/categories',
   verb: 'post',
   handler: post
});
async function post(req, res){
   const idEnveloppe = req.params.idEnveloppe;
   const writeModel = req.body;

   const category = await categoryRepository.add(idEnveloppe, writeModel);

   res.status(201).json(category);

}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/categories/:id',
   verb: 'put',
   handler: put
});
async function put(req, res){
   const idEnveloppe = req.params.idEnveloppe;
   const id = +req.params.id;
   const writeModel = req.body;

   const categories = await categoryRepository.get(idEnveloppe);
   const category = categories.find(c => c.id === id);

   if(!category) {
      res.status(404).end();
      return;
   }

   category.name = writeModel.name;

   await categoryRepository.update(idEnveloppe, category)

   res.status(204).end();
}

routingConfig.register({
   route: '/enveloppes/:idEnveloppe/categories/:id',
   verb: 'delete',
   handler: $delete
})
async function $delete(req, res){
   const idEnveloppe = req.params.idEnveloppe;
   const id = req.params.id;

   await categoryRepository.delete(idEnveloppe, id);

   res.status(204).end();
}

module.exports = 'categoryController';