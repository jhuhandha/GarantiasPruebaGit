const express = require('express');
const drinkValidation = require('./../validation/drink.validation');
const {auth} = require('./../middleware/auth');
const {create} = require('./../controller/drink.controller');

const router = express.Router();

router.post('/drink', [...drinkValidation(), auth], create);

module.exports = router;
