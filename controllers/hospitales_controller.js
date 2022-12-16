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
//-----------------------------------------------------------------------------
//FUNCION PARA ACTUALIZAR HOSPITAL
const actualizarHospital = async(req, resp = response) => {

    const id = req.params.id; //captamos el id del hospital a actualizar
    const uid = req.uid //captamos el uid del usuario

    try {

        //comprobamos que exista el hospital en la base de datos

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return resp.status(500).json({
                ok: true,
                msg: 'Hospital no nencontrado por id'
            })
        }

        //actualizamos el nombre en la base de datos con el nombre nuevo que viene en req.body.nombre
        //para un solo campo se podria hacer asi: hospital.nombre = req.body.nombre;


        //forma mas recomendada de actualizar:

        const cambiosHospital = {
            ...req.body, //aqui viene toda la informacion del body
            usuario: uid
        }

        //actualizamos:
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        resp.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }


};

//-------------------------------------------------------------
//FUNCION PARA ELIMINAR HOSPITAL

const borrarHospital = async(req, resp = response) => {

    const id = req.params.id; //captamos el id del hospital a eliminar

    try {

        //comprobamos que exista el hospital en la base de datos

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return resp.status(500).json({
                ok: true,
                msg: 'Hospital no nencontrado por id'
            });
        }

        //eliminamos el hosptal:

        const hospitalEliminado = await Hospital.findByIdAndDelete(id);

        resp.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}