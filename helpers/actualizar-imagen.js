const Usuario = require('../models/usuario');
const Hospitales = require('../models/hospital')
const Medicos = require('../models/medicos');
//plugin que nos ayuda a econtrar los archivos
const fs = require('fs');

//--------------------------------------------------------------------------------------
//funcion que se utiliza en la funcion de abajo
const borrarImagen = (path) => {

    /**fs es un plugin que nos ayuda a tratar los archivos */
    //si exista la imagen en uno de los archivos
    if (fs.existsSync(path)) {

        fs.unlinkSync(path); //elimina la imagen vieja
    }
};





/**esta funcion actualiza la imagen y elimina la anterior */
const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            //captamos el id del medico al que queremos acualizar la imagen
            const medico = await Medicos.findById(id);

            //comprobamos si existe
            if (!medico.id) {
                console.log('no existe un medico con ese id');
                return false;
            }
            //captamos la imagen vieja
            pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen(pathViejo);

            //asigamos la imagen nueva
            medico.img = nombreArchivo;

            //guardamos
            await medico.save();
            return true;

            break;

        case 'hospitales':
            //captamos el id del hoapital al que queremos acualizar la imagen
            const hospital = await Hospitales.findById(id);

            //comprobamos si existe
            if (!hospital.id) {
                console.log('no existe un hospital con ese id');
                return false;
            }
            //captamos la imagen vieja
            pathViejo = `./uploads/hospitales/${ hospital.img }`;

            borrarImagen(pathViejo);

            //asigamos la imagen nueva
            hospital.img = nombreArchivo;

            //guardamos
            await hospital.save();

            return true;
            break;

        case 'usuarios':
            //captamos el id del usuario al que queremos acualizar la imagen
            const usuario = await Usuario.findById(id);

            //comprobamos si existe
            if (!usuario.id) {
                console.log('no existe un usuario con ese id');
                return false;
            }
            //captamos la imagen vieja
            pathViejo = `./uploads/usuarios/${ usuario.img }`;

            borrarImagen(pathViejo);

            //asigamos la imagen nueva
            usuario.img = nombreArchivo;

            //guardamos
            await usuario.save();

            return true;

            break;


    }


};

const actualizarInforme = async(tipo, id, nombreArchivo) => {



    if (tipo === 'usuarios') {

        //captamos el id del usuario al que queremos acualizar la imagen
        const usuario = await Usuario.findById(id);

        //comprobamos si existe
        if (!usuario.id) {
            console.log('no existe un usuario con ese id');
            return false;
        }



        usuario.informe = usuario.informe.push('informe');


        //guardamos
        await usuario.save();

        return true;



    }


};



module.exports = {
    actualizarImagen,
    actualizarInforme
}