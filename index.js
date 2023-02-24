require('dotenv').config();
const path = require('path'); //predefindo de express

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//carpeta publica
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios_routes'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medico'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


//si no es ninguna de las rutas anteriores coje el index.html
app.get('*', (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'public/index.html'));
})







app.listen(process.env.PORT, () => {
    console.log('seridor corriendo en el puerto ' + process.env.PORT)
})

//mean_user
//mVVgZaC0GYZ0rYdM