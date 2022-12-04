/**
 * ruta :'/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator')

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales_controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();


//leemos hospitales
router.get('/', getHospitales);


//validamos los campos y creamos hospitales
router.post('/', [validarJWT,
        check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);



//actualizar hospitales
router.put('/:id', [],
    actualizarHospital);

//eliminar hospitales
router.delete('/:id',
    borrarHospital);


module.exports = router;