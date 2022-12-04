const { Schema, model, SchemaType } = require('mongoose');


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String,
    },
    usuario: {
        //indicamos que hay una relacion entre este documento y models/usuario.js para saber que usuario creo el medico
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital: {
        require: true,
        //indicamos que hay una relacion entre este documento y models/hospital.js 
        type: Schema.Types.ObjectId,
        ref: 'Hospital',

    }

}, { collection: 'Medicos' }); //aqui podemos definir el nombre de la colection


/**La siguiente funcion lo que hace es renombrar 
 * _id a uid y elimina el campo __v 
 * 
 * !solo para fines visuales !
 * 
 * */

MedicoSchema.method('toJSON', function() {

    //extraemos __v,_id de todos los campos de mi objeto
    const { __v, ...object } = this.toObject();


    return object;
})


module.exports = model('medicos', MedicoSchema);