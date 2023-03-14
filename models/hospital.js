const { Schema, model, SchemaType } = require('mongoose');

//
const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    usuario: {
        require: true,
        //indicamos que hay una relacion entre este documento y models/usuario.js para saber que usuario creo el hospital
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' }); //aqui podemos definir el nombre de la colection


/**La siguiente funcion lo que hace es renombrar 
 * _id a uid y elimina el campo __v 
 * 
 * !solo para fines visuales !
 * 
 * */

HospitalSchema.method('toJSON', function() {

    //extraemos __v,_id de todos los campos de mi objeto
    const { __v, ...object } = this.toObject();


    return object;
})


module.exports = model('Hospital', HospitalSchema);