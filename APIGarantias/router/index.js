const express = require('express');
const app = express();
app.use('/api', require('./user.router'));
module.exports = app;
