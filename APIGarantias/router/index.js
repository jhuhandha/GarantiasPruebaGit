const express = require('express');
const app = express();
app.use('/api', require('./user.router'));
app.use('/api', require('./drink.router'));
app.use('/api', require('./order.router'));
module.exports = app;
