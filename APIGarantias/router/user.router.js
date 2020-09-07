const express = require('express');
const userValidation = require('./../validation/user.validation');
const {auth} = require('./../middleware/auth');
const {
  list,
  create,
  login,
  logout,
} = require('./../controller/user.controller');

const router = express.Router();

router.get('/user', auth, list);
router.post('/user', [...userValidation()], create);
router.post('/user/login', [...userValidation()], login);
router.get('/user/logout', auth, logout);

module.exports = router;
