const { Schema, model, SchemaType } = require('mongoose');


const CitaSchema = Schema({

    especialidad: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },

    hora: {
        type: String,
        require: true
    },
    usuario: {
        //indicamos que hay una relacion entre este documento y models/usuario.js para saber que usuario creo el Cita
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital: {
        require: true,
        //indicamos que hay una relacion entre este documento y models/hospital.js 
        type: Schema.Types.ObjectId,
        ref: 'Hospital',

    },

}, { collection: 'Citas' }); //aqui podemos definir el nombre de la colection


/**La siguiente funcion lo que hace es renombrar 
 * _id a uid y elimina el campo __v 
 * 
 * !solo para fines visuales !
 * 
 * */

CitaSchema.method('toJSON', function() {

    //extraemos __v,_id de todos los campos de mi objeto
    const { __v, ...object } = this.toObject();


    return object;
})


module.exports = model('Citas', CitaSchema);