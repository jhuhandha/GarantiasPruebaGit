const {check, sanitize, body} = require('express-validator');

module.exports = () => [
    check('username').notEmpty().withMessage("El usuario es requerido"),
    check('password').notEmpty().withMessage("La clave es requerida"),
];
