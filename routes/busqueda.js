/**
 * ruta :'/api/todo/'
 */

const { Router } = require("express");
const { getTodo, getdDocumentosColeccion } = require("../controllers/busqueda_controller");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get('/:busqueda', validarJWT, getTodo); //busca en todos las colleciones

router.get('/coleccion/:tabla/:busqueda', validarJWT, getdDocumentosColeccion); //busca en una coleccion especifica



module.exports = router;