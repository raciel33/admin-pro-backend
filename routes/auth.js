/**
 * path:/api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { rewToken } = require('../controllers/auth_controllers');
const { googleSingIn } = require('../controllers/auth_controllers');


const { login } = require('../controllers/auth_controllers');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt')


const router = Router();


//validamos los campos y creamos usuarios
router.post('/', [
        check('email', 'el correo es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);
//cuando viene la autenticacion de google
router.post('/google', [
        check('token', 'el token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn);

//saca al usuario cuando expire el token
router.get('/renew',
    validarJWT,
    rewToken
);


module.exports = router;