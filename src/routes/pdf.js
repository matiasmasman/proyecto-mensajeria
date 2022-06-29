const express = require('express');
const router = express.Router();
const multer = require('multer');
const mimeTypes = require('mime-types');

const mysqlConnection = require('../database');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        console.log(file);
        cb('', Date.now() + '.' + mimeTypes.extension(file.mimetype));
    }
});

const upload = multer({storage: storage});

router.post('/', upload.single('myFile'), (req, res) => {
    console.log(req.file);
    res.send('Saving pdf');

    /*const { id, filename } = req.body;
    console.log(req.body);
    const query = `
        CALL escuelaAddOrEdit(?, ?);
    `;
    mysqlConnection.query(query, [id, nombre], (err, rows, fields) => {
        if (!err) {
            res.json({Status: 'PDF Saved'});
        } else {
            console.log(err);
        }
     });*/
});

module.exports = router;