const appSettings = require('./appSettings');

const express = require('express');

const app = express();
app.use(express.json());

// TODO: Error handler, does not seems to work, at least not when sql query crashes.
app.use(function(err, req, res, next){
   console.log('***** error handled ******');
   console.warn(err);
   res.status(500).send(err);
})

app.get('/', (req, res) => {
   res.send('hello world');
});

require ('./controllers');
const routingConfig = require('./routingConfig');

routingConfig.enumerate(({ verb, route, handler }) => {
   app[verb](route, handler);
});

const port = appSettings.serverPort;

app.listen(port, () => {
   console.log(`listening to ${port}`);
})