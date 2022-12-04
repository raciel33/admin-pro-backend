const { response } = require('express');

//instancia de hospital
const Hospital = require('../models/hospital');

//FUNCION QUE DEVUELVE LOS hospitales DE MONGOBD
const getHospitales = async(req, resp = response) => {

    /**NOTA: con la funcion popularte() podemos extraer facilmente el usuario que creo el hospital
     * y acceder a sus campos nombre, email, etc...
     */
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    resp.json({
        ok: true,
        hospitales
    });
};



const crearHospital = async(req, resp = response) => {

    //captamos el id del usuario que creo el hospital
    const uid = req.uid;

    const hospital = new Hospital({

        usuario: uid, //usuario que creo el hosìtal
        ...req.body //cogemos todos los campos que vienen en el body

    });

    try {

        hospitalDB = await hospital.save(); //guardamos en la bd


        resp.json({
            ok: true,
            hospital: hospitalDB
        });


    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })

    }




};
const actualizarHospital = async(req, resp = response) => {


    resp.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = async(req, resp = response) => {


    resp.json({
        ok: true,
        msg: 'borrarHospital'
    });
};


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}