/**
 * ruta :'/api/uploads/'
 * nota npm i express-fileupload

 */

const { Router } = require("express");
const { fileUpload, retornaImagen } = require("../controllers/upload_controller");
const { validarJWT } = require("../middleware/validar-jwt");
const expresFileUpload = require('express-fileupload');


const router = Router();

router.use(expresFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', retornaImagen);





module.exports = router;