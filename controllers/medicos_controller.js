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

    const id = req.params.id; //captamos el id del medico a actualizar
    const uid = req.uid //captamos el uid del usuario

    try {

        //comprobamos que exista el medico en la base de datos

        const medico = await Medico.findById(id);

        if (!medico) {
            return resp.status(500).json({
                ok: true,
                msg: 'Medico no nencontrado por id'
            })
        }

        //actualizamos el nombre en la base de datos con el nombre nuevo que viene en req.body.nombre
        //para un solo campo se podria hacer asi: medico.nombre = req.body.nombre;


        //forma mas recomendada de actualizar:

        const cambiosMedico = {
            ...req.body, //aqui viene toda la informacion del body
            usuario: uid
        };

        //actualizamos:
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        resp.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

};

const borrarMedico = async(req, resp = response) => {


    const id = req.params.id; //captamos el id del medico a eliminar

    try {

        //comprobamos que exista el medico en la base de datos

        const medico = await Medico.findById(id);

        if (!medico) {
            return resp.status(500).json({
                ok: true,
                msg: 'medico no nencontrado por id'
            });
        }

        //eliminamos el hosptal:

        await Medico.findByIdAndDelete(id);

        resp.json({
            ok: true,
            msg: 'medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}