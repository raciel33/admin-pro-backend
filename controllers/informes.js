/*predeterminado de node para tratar rutas 
( se utiliza en la funcion retornarImagen no confundir con la variable path) de la funcion fileUpload 
*/
const path = require('path');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid'); //para generar id
const { actualizarImagen, actualizarInforme } = require('../helpers/actualizar-imagen');
const fs = require('fs');



const fileUploadInforme = (req, resp = response) => {

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
    const file = req.files.informe;

    /*para fraccionar y convertirlo en un array con el objetivo de quedarnos con la teminacion jpg, pdf...
    ej: nombreCortado = 'wolwerine.1.3.jpg
        nombreCortado = file.name.split('.');
        nombreCortado = [wolwerine , 1 ,3 , jpg]
   */
    const nombreCortado = file.name.split('.');

    //nos quedamos con la extension del arhivo
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extencion
    const extencionesValidasFotos = ['doc', 'txt', 'pdf'];


    if (!extencionesValidasFotos.includes(extensionArchivo)) {
        return resp.status(400).json({
            ok: false,
            msg: 'no es una extencion permitida para fotos'
        });
    } else {
        //generar nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; //se utiliza uuid (npm i uuid) para generar un id unico para cada archivo

        //path para guardar la imagen

        //indicamos donde se va guardar
        const path = `./informes/${tipo}/${nombreArchivo}`;
        console.log('mi ruta de archivo es ' + path);

        //mover la imagen (viene de la documentacion de npm i express-fileupload le he adaptado los nombres de las variables)
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return resp.status(500).json({
                    ok: false,
                    msg: 'error al mover la imagen'
                });

            }

            actualizarInforme(tipo, id, nombreArchivo);



            resp.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
        });

    }





};




const retornaInforme = (req, res = response) => {

    const tipo = req.params.tipo; //captamos el tipo ( hospitales', 'medicos', 'usuarios) en la url
    const foto = req.params.foto;

    //__dirname: donde esta la aplicacion desplegada
    const pathInforme = path.join(__dirname, `../informes/${ tipo }/${ foto }`);

    console.log(pathInforme);
    //imagen por defecto
    if (fs.existsSync(pathInforme)) {
        res.sendFile(pathInforme);
    } else {
        const pathInforme = path.join(__dirname, `../informes/no-img.jpg`);
        res.sendFile(pathInforme);
    }

}




module.exports = {
    fileUploadInforme,
    retornaInforme,

}