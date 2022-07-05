const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000); //en caso de haber un puerto definido en el sistema lo toma, sino usa el puerto 3000

// Middlewares
app.use(morgan('dev')); //permite ver por consola las peticiones que llegan al servidor
app.use(express.json()); //permite al sv recibir formato json y entenderlo

// Routes
app.use('/escuela', require('./routes/school'));
app.use('/alumnos', require('./routes/student'));
app.use('/correo', require('./routes/mail'));
app.use('/archivo', require('./routes/pdf'));

// Starting the server
app.listen(app.get('port'), () => { //funcion para imprimir mensaje al iniciar
    console.log(`Server on port ${app.get('port')}`);
});