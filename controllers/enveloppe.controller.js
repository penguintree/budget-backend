const routingConfig = require('~/routingConfig');
const enveloppeRepository = require('~/repositories/enveloppeRepository');

routingConfig.register({
   route: '/enveloppes',
   verb: 'get',
   handler: getAll
});
async function getAll(req, res){
   const enveloppes = await enveloppeRepository.getAll();
   res.json(enveoppes);
}

module.exports = 'enveloppeController';