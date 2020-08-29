require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');

const {sequelize, User} = require('./model');

const app = express();

app.use(expressFileUpload());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API Garantias');
});
app.use(require('./router'));

sequelize.sync({force: true}).then(() => {
  User.bulkCreate([
    {
      name: 'Juan',
      username: 'juanda',
      password: bcrypt.hashSync('123456', 10),
      role: 'ADMIN',
    },
  ]);

  app.listen(process.env.PORT, () => {
    console.log(`Corriendo por el puerto ${process.env.PORT}`);
  });
});
