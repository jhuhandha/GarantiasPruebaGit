const { check, body, sanitize } = require('express-validator');

module.exports = () => [
    check('name').notEmpty().trim(),
    check('unit_price').notEmpty().trim()
]