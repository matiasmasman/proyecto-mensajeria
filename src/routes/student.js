const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM alumnos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM alumnos WHERE id_alumnos = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, nombre } = req.body;
    console.log(req.body);
    const query = `
        CALL alumnosAddOrEdit(?, ?);
    `;
    mysqlConnection.query(query, [id, nombre], (err, rows, fields) => {
        if (!err) {
            res.json({Status: 'Student Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    const query = `CALL alumnosActualizar(?, ?);`;
    mysqlConnection.query(query, [id, nombre], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Student Updated'});
        } else {
            console.log(err);
        }

    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM alumnos WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Student Deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;