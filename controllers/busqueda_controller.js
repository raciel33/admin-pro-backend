const { response } = require('express');

const Usuario = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospitales = require('../models/hospital')

//---------------------------------------------------------------------------------------------------------
//PARA HACER BUSQUEDAS EN TODAS LA COLLECIONES

const getTodo = async(req, resp = response) => {

    const busqueda = req.params.busqueda; //parametro de busqueda de la url

    const regex = new RegExp(busqueda, 'i'); //con esto conseguimos que la busqueda no sea case senbility


    //con esta promesa hacemos que la busqueda se haga de forma simultanea varias colecciones de la BD
    const [usuarios, medicos, hospitales] = await Promise.all([

        Usuario.find({
            nombre: regex //buscamos los nombres que coinciden con el parametro (nombre es un campo en la BD) collection Usuarios
        }),
        Medicos.find({
            nombre: regex //buscamos los nombres que coinciden con el parametro (nombre es un campo en la BD)collection Medicos
        }),
        Hospitales.find({
            nombre: regex //buscamos los nombres que coinciden con el parametro (nombre es un campo en la BD) collection hospitales
        })
    ]);


    resp.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
};

//--------------------------------------------------------------------------------------------------------

//PARA HACER BUSQUEDAS EN UNA COLLECCTION ESPECIFICA
//BUSQUEDA DE COLEECION ESPECIFICA

const getdDocumentosColeccion = async(req, resp = response) => {

    const tabla = req.params.tabla; //parametro de tabla de la url
    const busqueda = req.params.busqueda; //parametro de busqueda de la url
    const regex = new RegExp(busqueda, 'i'); //con esto conseguimos que la busqueda no sea case senbility
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex }).
            populate('usuario', 'nombre img').
            populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            //buscamos los nombres que coinciden con el parametro (nombre es un campo en la BD) collection Usuarios
            data = await Hospitales.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            //buscamos los nombres que coinciden con el parametro (nombre es un campo en la BD) collection Usuarios
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return resp.status(400).json({
                ok: false,
                msg: ' la table tiene que ser usuarios/medico/hospitales'
            });


    }

    if (data.length == 0) {
        resp.json({
            ok: false,
            msg: ' no se han encontrados registros en la BD'
        });
    } else {
        resp.json({
            ok: true,
            resultado: data
        });
    }



};


module.exports = {
    getTodo,
    getdDocumentosColeccion
};