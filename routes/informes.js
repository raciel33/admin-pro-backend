/**
 * ruta :'/api/uploads/'
 * nota npm i express-fileupload

 */

const { Router } = require("express");
//const { fileUpload, retornaImagen } = require("../controllers/upload_controller");
const { validarJWT } = require("../middleware/validar-jwt");
const expresFileUpload = require('express-fileupload');
const { fileUploadInforme, retornaInforme } = require("../controllers/informes");


const router = Router();

router.use(expresFileUpload());

router.post('/:tipo/:id', validarJWT, fileUploadInforme);

router.get('/:tipo/:foto', retornaInforme);



module.exports = router;