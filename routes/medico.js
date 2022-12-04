/**
 * ruta :'/api/medico'
 */

const { Router } = require('express');
const { check } = require('express-validator')
    //const { validarCampos } = require('../middleware/validar-campos');
    //const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos_controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();


//leemos Medico
router.get('/', getMedicos);


//validamos los campos y creamos Medico
router.post('/', [
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('hospoital', 'el hospital id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearMedico);



//actualizar Medico
router.put('/:id', [],
    actualizarMedico);

//eliminar Medico
router.delete('/:id',
    borrarMedico);


module.exports = router;