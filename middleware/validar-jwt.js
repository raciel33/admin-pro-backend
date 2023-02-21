const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = (req, res, next) => {

    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        })
    }

    try {

        //captamos el id correspondiente a este token
        //process.env.JWT_SECRET: hace referencia donde tengo la palabra secreta para firmar token (./env)
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        })
    }


}



const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioDB = await Usuario.findById(uid); //Buscamos el usuario por id

        //si no existe
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }
        //si el role no es 'ADMIN_ROLE'
        if (usuarioDB.role != 'ADMIN_ROLE') {
            res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })

    }

}

const validarADMIN_ROLE_o_MISMO_USUARIO = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id; //id que viene en la url

    try {

        const usuarioDB = await Usuario.findById(uid); //Buscamos el usuario por id

        //si no existe
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'usuario no existe'
            });
        }
        //si el role  es 'ADMIN_ROLE' o uid === id es un usuario que se quiere actualizar a si mismo
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {

            next(); //dejalo a actualizar

        } else {
            res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });

        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })

    }

}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MISMO_USUARIO
}