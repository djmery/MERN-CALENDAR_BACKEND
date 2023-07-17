const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//saca todos los procesos que están corriendo en el environment, todos los que están corriendo en node
//console.log(process.env);

//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

//Rutas
//Especificamos la ruta en la cual quiero que esté habilitado el endpoint que voy a crear
//todo lo que el archivo /routes/auth vaya a exportar lo va habilitar en la ruta /api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    //ponemos el path donde se encuentra nuestra carpeta publica, dirname sería el path inicial
    res.sendFile(__dirname + '/public/index.html')
})

//TODO: CRUD: Eventos


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});