const { validarJWT } = require('../middleware/validar-jwt');
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCita, getCitas, borrarCita } = require('../controllers/citas_controllers');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


//leemos todas las citas
router.get('/', getCitas);

//cita de un usuario
//router.get('/cita/:id', validarJWT, getCitaUsuario);

//validamos los campos y creamos la cita
router.post('/', [
        validarJWT,
        check('especialidad', 'la especialidad es necesario').not().isEmpty(),
        check('fecha', 'la fecha es necesario').not().isEmpty(),
        check('hora', 'la hora es necesario').not().isEmpty(),
        check('hospital', 'el hospital id debe ser valido').isMongoId(),

        validarCampos
    ],
    crearCita);

//eliminar cita
router.delete('/:id',
    borrarCita);

module.exports = router;