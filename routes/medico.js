/**
 * ruta :'/api/medico'
 */

const { Router } = require('express');
const { check } = require('express-validator')
    //const { validarCampos } = require('../middleware/validar-campos');
    //const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicosById } = require('../controllers/medicos_controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();


//leemos Medico
router.get('/', validarJWT, getMedicos);


//validamos los campos y creamos Medico
router.post('/', [
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('especialidad', 'la especialidad del medico es necesario').not().isEmpty(),
        check('hospital', 'el hospital id debe ser valido').isMongoId(),
        validarCampos

    ],
    crearMedico);



//actualizar Medico
router.put('/:id', [],
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
    actualizarMedico);


//eliminar Medico
router.delete('/:id', validarJWT,
    borrarMedico);

//eliminar Medico
router.get('/:id', validarJWT,
    getMedicosById);

module.exports = router;