const appSettings = require('./appSettings');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: appSettings.corsOrigin }));
app.use(express.json());

// Accept only json type post, put, patch
const jsonRequiredMethods = ['POST', 'PUT', 'PATCH'];
app.use((req, res, next) => {
   if(jsonRequiredMethods.includes(req.method)) {
      const contentType = req.headers['content-type'];
      if (!contentType.split(';').includes('application/json')) {
         res.status(400).send(`Server requires application/json. Received ${contentType}`);
         return;
      }
   }

   next();
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