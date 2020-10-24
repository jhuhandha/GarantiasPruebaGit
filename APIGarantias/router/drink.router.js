const express = require('express');
const drinkValidation = require('./../validation/drink.validation');
const {auth, auth_image} = require('./../middleware/auth');
const {create, index, showImage, modify, edit} = require('./../controller/drink.controller');

const router = express.Router();

router.get('/drink', auth, index);
router.get('/drink/show/:image', auth_image, showImage);
router.post('/drink', [...drinkValidation(), auth], create);
router.get('/drink/:id', auth, edit);
router.put('/drink/:id', [...drinkValidation(), auth], modify);

module.exports = router;
