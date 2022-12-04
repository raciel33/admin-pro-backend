const { response } = require('express');

//instancia de medico
const Medico = require('../models/medicos');

//FUNCION QUE DEVUELVE LOS medicos DE MONGOBD
const getMedicos = async(req, resp = response) => {

    /**NOTA: con la funcion popularte() podemos extraer facilmente el usuario y los hospitales que creo el medico
     * y acceder a sus campos nombre, email, etc...
     */
    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre');

    resp.json({
        ok: true,
        medicos
    });
};


//-----------------------------------------------------------------------------------------
const crearMedico = async(req, resp = response) => {

    //captamos el id del usuario que creo el medico
    const uid = req.uid;

    //const hid = req.

    const medico = new Medico({

        usuario: uid, //usuario que creo el medico
        ...req.body //cogemos todos los campos que vienen en el body

    });


    try {

        medicoDB = await medico.save(); //guardamos en la bd

        resp.json({
            ok: true,
            medico: medicoDB
        });


    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }


};
const actualizarMedico = async(req, resp = response) => {


    resp.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = async(req, resp = response) => {


    resp.json({
        ok: true,
        msg: 'borrarMedico'
    });
};


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}