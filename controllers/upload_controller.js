/*predeterminado de node para tratar rutas 
( se utiliza en la funcion retornarImagen no confundir con la variable path) de la funcion fileUpload 
*/
const path = require('path');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); //para generar id
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fs = require('fs');




const fileUpload = (req, resp = response) => {

    const tipo = req.params.tipo; //captamos el tipo ( hospitales', 'medicos', 'usuarios) en la url
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return resp.status(400).json({
            ok: false,
            msg: ' No es un medico , usuario u hospital '
        });
    }

    //validamos que exista un archivo (viene de la documentacion de npm i express-fileupload )-> Basic File Upload

    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //PROCESAR LA IMAGEN

    //extraemos la imagen (nota: imagen viene del nombre que le damos en postman/body/key)
    const file = req.files.imagen;

    /*para fraccionar y convertirlo en un array con el objetivo de quedarnos con la teminacion jpg, pdf...
    ej: nombreCortado = 'wolwerine.1.3.jpg
        nombreCortado = file.name.split('.');
        nombreCortado = [wolwerine , 1 ,3 , jpg]
   */
    const nombreCortado = file.name.split('.');

    //nos quedamos con la extension del arhivo
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extencion
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extencionesValidas.includes(extensionArchivo)) {
        return resp.status(400).json({
            ok: false,
            msg: 'no es una extencion permitida'
        });
    }
    //generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; //se utiliza uuid (npm i uuid) para generar un id unico para cada archivo

    //path para guardar la imagen

    //indicamos donde se va guardar
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen (viene de la documentacion de npm i express-fileupload le he adaptado los nombres de las variables)
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });

        }


        //Actualizar Base de datos
        //esta funcion esta en los helpers 
        actualizarImagen(tipo, id, nombreArchivo);


        resp.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });



};

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo; //captamos el tipo ( hospitales', 'medicos', 'usuarios) en la url
    const foto = req.params.foto;

    //__dirname: donde esta la aplicacion desplegada
    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}