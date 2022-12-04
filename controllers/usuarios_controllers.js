const { response } = require('express')

//paquete para encriptar contraseñas
//nota: hay que importarlo asi sin las llaves para que funcione
const bcrypt = require('bcryptjs')

//importamos el modelo
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


//Nota: para usar el await tiene que ser una funcion ansync
//con await le decimos :"espera que esto termine antes de seguir


//---------------------------------------------------------------------------------------------------------------
//FUNCION QUE DEVUELVE LOS USUARIOS DE MONGOBD
const getUsuarios = async(req, resp) => {

    //HACIENDO PAGINACION
    //obtenemos parametro opcional ('desde') del url y si no tiene parametro opcional utiliza el cero
    const desde = Number(req.query.desde);
    console.log(desde);



    // Promise.all: para ejecutar varias promesasa simultaneamente y que no haya conflicto

    //Promise1-> usuarios = Usuario.find().skip(desde).limit(5),
    //Promise2-> total = Usuario.count()

    const [usuarios, total] = await Promise.all([

        // Usuario.find();: devuelve todos los campos
        //  Usuario.find( {}, 'nombre email'); especificamos los campos que queremos 
        //PAGINACION!!!!!!!
        //skip( desde ) obtiene el resultado a partir de aqui
        //limit( 5 ): definimos el numero de resultados a obtener

        Usuario.find().skip(desde).limit(5),
        Usuario.count()
    ])

    resp.json({
        ok: true,
        usuarios,
        total
    });
};

//---------------------------------------------------------------------------------------------------------------

//FUNCION QUE INSERTA LOS USUARIOS DE MONGOBD
//resp = response: para tener el status, etc...
const crearUsuario = async(req, resp = response) => {

    const { email, password } = req.body; //la respuesta que viene del body


    try {

        const existeEmail = await Usuario.findOne({ email }); //busca solo este campo
        const usuario = new Usuario(req.body); //instancia de Usuario del modelo

        //validacion para que el email sea unico
        if (existeEmail) {
            //respuesta a dar si existe el email
            return resp.status(400).json({
                ok: false,
                msg: "El correo ya existe"

            })
        }


        //Encriptado de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save(); //guarda en la BD


        //generamos un token
        const token = await generarJWT(usuario.id);


        resp.json({
            ok: true,
            usuario,
            token
        });




    } catch (error) {
        console.log(error);

        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        })

    }



};

//---------------------------------------------------------------------------------------------------------------
//funcion para actualizar los usuarios
const actualizarUsuario = async(req, res = response) => {

    //VALIDAR TOKEN Y COMPROBAR EL USUARIO (se va tomar como referencia el id)

    //captamos el parametro
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        //si el usuario no existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No exixtse el usuario con ese id'
            })
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body; // extraemos password, google, email de campos


        if (usuarioDB.email !== req.body.email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }

        }

        campos.email = email;


        //findByIdAndUpdate ( uid, campos) (el primer parametro 'uid' indicamos que usuario queremos actualizar y el segundo 'campos' los campos a a actualizar)
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado '
        })

    }
}

//---------------------------------------------------------------------------------------------------------------

const borrarUsuario = async(req, res = response) => {

    //captamos el parametro
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        //si el usuario no existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        } else {

            const eliminandoUsuario = await Usuario.findByIdAndDelete(uid);

            return res.status(200).json({
                ok: true,
                msg: "eliminando: " + uid
            })
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado '
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}