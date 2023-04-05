const { response } = require('express');

//instancia de citas
const Citas = require('../models/citas');
const Usuarios = require('../models/usuario');


//FUNCION QUE DEVUELVE LOS citas DE MONGOBD
const getCitas = async(req, resp = response) => {


    /**NOTA: con la funcion popularte() podemos extraer facilmente el usuario y los hospitales de la cita
     * y acceder a sus campos nombre, email, etc...
     */
    const citas = await Citas.find().populate('usuario', 'nombre img ').populate('hospital', 'nombre img ');

    resp.json({
        ok: true,
        citas,
    });
};





//-----------------------------------------------------------------------------------------
const crearCita = async(req, resp = response) => {

    //captamos el id del usuario que creo la cita
    const uid = req.uid;
    //const hid = req.

    const cita = new Citas({

        usuario: uid, //usuario que creo la cita
        ...req.body //cogemos todos los campos que vienen en el body

    });

    try {

        citaDB = await cita.save(); //guardamos en la bd

        resp.json({
            ok: true,
            cita: citaDB
        });

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }


};

const borrarCita = async(req, resp = response) => {

    const id = req.params.id; //captamos el id de la cita a eliminar

    try {

        //comprobamos que exista la cita exiat en la base de datos

        const cita = await Citas.findById(id);

        if (!cita) {
            return resp.status(500).json({
                ok: true,
                msg: 'Hospital no nencontrado por id'
            });
        }

        //eliminamos el hosptal:

        const citaEliminada = await Citas.findByIdAndDelete(id);

        resp.json({
            ok: true,
            msg: 'Cita eliminada'
        });

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
};

module.exports = {
    getCitas,
    crearCita,
    borrarCita,


}