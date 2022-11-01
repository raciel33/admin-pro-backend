/**
 * Ruta: /api/usuarios
 * express-validator: plugin instalado en npm i express-validator
 */

const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios_controllers')
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//hace referencia a ../controllers/usuarios_controllers

//leemos usuarios
router.get('/', validarJWT, getUsuarios);


//validamos los campos y creamos usuarios
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos

    ],
    crearUsuario);



//actualizar usuario
router.put('/:id', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    actualizarUsuario);

//eliminar usuario
router.delete('/:id',
    validarJWT,
    borrarUsuario);


module.exports = router;