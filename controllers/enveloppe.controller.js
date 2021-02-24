const routingConfig = require('~/routingConfig');

routingConfig.register({
   route: '/enveloppes',
   verb: 'get',
   handler: getAll
});
function getAll(req, res){
   res.json([{
      id: 1,
      name: '2021',
   }]);
}

module.exports = 'enveloppeController';