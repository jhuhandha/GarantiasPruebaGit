const express = require('express');
const app = express();
app.use('/api', require('./user.router'));
app.use('/api', require('./drink.router'));
module.exports = app;
