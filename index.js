const winston = require('winston');
const express = require('express');
const app = express();

require('./blockchain_api/startup/logging')();
require('./blockchain_api/startup/routes')(app);
require('./blockchain_api/startup/database')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;