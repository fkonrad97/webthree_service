const express = require('express');
const web3route = require('../routes/web3route');

module.exports = function(app) {
    app.use(express.json());
    app.use('/editor/web3route', web3route);
}