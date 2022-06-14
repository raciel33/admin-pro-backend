require('dotenv').config();

const exppres = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//crear el servidor express
const app = exppres();

//Configurar cors
app.use(cors());

//base de datos
dbConnection();


//Rutas
app.get('/', (req, resp) => {
    resp.json({
        ok: true,
        msj: 'Hola mundo'
    })
});



app.listen(process.env.PORT, () => {
    console.log('seridor corriendo en el puerto ' + process.env.PORT)
})

//mean_user
//mVVgZaC0GYZ0rYdM