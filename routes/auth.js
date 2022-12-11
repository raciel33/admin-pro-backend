/**
 * path:/api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { googleSingIn } = require('../controllers/auth_controllers');


const { login } = require('../controllers/auth_controllers');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


//validamos los campos y creamos usuarios
router.post('/', [
        check('email', 'el correo es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);

router.post('/google', [
        check('token', 'el token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn);


module.exports = router;