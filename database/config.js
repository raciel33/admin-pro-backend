const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        /*NOTA IMPORTANTE: He tenido que ir a node_modules/mongodb/lib/db.js y en la funcion 
        validateDatabaseName(databaseName) poner la const invalidChars = [' ', '.', '$', '\\'] de esta forma porque 
        tenia // y daba fallo 
        */
        ;
        await mongoose.connect(process.env.DB_CNN); //esta definido en este archivo ('/env)
        console.log("db online");

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }




}

module.exports = {
    dbConnection
}