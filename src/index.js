const express = require('express');
const app = express();
const morgan = require('morgan');
const multer = require('multer');

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

// This folder for this application will be used to store public files
//app.use('/uploads', express.static(path.resolve('uploads')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});