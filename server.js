const appSettings = require('./appSettings');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: appSettings.corsOrigin }));
app.use(express.json());

// Accept only json type post, put, patch
const jsonRequiredMethods = ['POST', 'PUT', 'PATCH'];
app.use((req, res, next) => {
   if(jsonRequiredMethods.includes(req.method) && req.headers['content-type'] !== 'application/json') {
      console.log(req.headers['content-type']);
      console.log(req.headers);
      res.status(400).send('Server requires application/json');
   } else {
      next();
   }
});

require ('./controllers');
const routingConfig = require('./routingConfig');

routingConfig.enumerate(({ verb, route, handler }) => {
   app[verb](route, (res, req, next) => {
      handler(res, req).catch(next);
   });
});

// Error handling
const errorHandler = require('./errorHandler');
app.use(errorHandler);

const port = appSettings.serverPort;

app.listen(port, () => {
   console.log(`listening to ${port}`);
})