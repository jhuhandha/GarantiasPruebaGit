const express = require('express');
const {index, save} = require('./../controller/orders.controller');
const {auth} = require('./../middleware/auth');
const OrderValidator = require('./../validation/order.validation');

let router = express.Router();

router.get('/orders', index);
router.post('/orders', [...OrderValidator(), auth], save);

module.exports = router;
