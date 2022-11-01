require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios_routes'));
app.use('/api/login', require('./routes/auth'));





app.listen(process.env.PORT, () => {
    console.log('seridor corriendo en el puerto ' + process.env.PORT)
})

//mean_user
//mVVgZaC0GYZ0rYdM