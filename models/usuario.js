const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    citas: {
        type: String
    },
    img: {
        type: String,
    },
    informe: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});


/**La siguiente funcion lo que hace es renombrar 
 * _id a uid y elimina el campo __v 
 * 
 * !solo para fines visuales !
 * 
 * */

UsuarioSchema.method('toJSON', function() {

    //extraemos __v,_id de todos los campos de mi objeto
    const { __v, _id, password, ...object } = this.toObject();

    //renombrar _id a uid 
    object.uid = _id;

    return object;
})


module.exports = model('Usuario', UsuarioSchema);