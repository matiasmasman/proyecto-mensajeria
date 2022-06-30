const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/escuela', require('./routes/school'));
app.use('/alumnos', require('./routes/student'));
app.use('/correo', require('./routes/mail'));
app.use('/archivo', require('./routes/pdf'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});