const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM escuela', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM escuela WHERE id_escuela = ?', [id], (err, rows, fields) => {
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
        CALL escuelaAddOrEdit(?, ?);
    `;
    mysqlConnection.query(query, [id, nombre], (err, rows, fields) => {
        if (!err) {
            res.json({Status: 'School Saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    const query = `CALL escuelaAddOrEdit(?, ?);`;
    mysqlConnection.query(query, [id, nombre], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'School Updated'});
        } else {
            console.log(err);
        }

    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM escuela WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'School Deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;