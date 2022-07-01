const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM mensaje', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM mensaje WHERE id_mensaje = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id_mensaje, text, id_alumnos } = req.body;
    console.log(req.body);
    const query = `
        CALL creaMail(?, ?, ?);
    `;
    mysqlConnection.query(query, [id_mensaje, text, id_alumnos], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Mail Saved' });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;