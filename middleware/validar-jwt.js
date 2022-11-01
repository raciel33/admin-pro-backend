const jwt = require('jsonwebtoken')


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

module.exports = {
    validarJWT
}