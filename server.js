const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
   res.send('hello world');
});

require ('./controllers');
const routingConfig = require('./routingConfig');

routingConfig.enumerate(({ verb, route, handler }) => {
   app[verb](route, handler);
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
   console.log(`listening to ${port}`);
})