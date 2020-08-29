const express = require('express');
const {list} = require('./../controller/user.controller');
const router = express.Router();

router.get('/user', list);

module.exports = router;
