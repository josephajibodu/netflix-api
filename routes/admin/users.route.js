
const express = require('express');
const router = express.Router();


// User Schema
// - email
// - full name
// - dob
// - gender

router.get('/', function (req, res) {
    res.send('all')
});

router.get('/:id', function (req, res) {
    res.send('single')
});

router.post('/', function (req, res) {
    res.send('create')
});

router.put('/:id', function (req, res) {
    res.send('update')
});

router.delete('/:id', function (req, res) {
    res.send('delete')
});

module.exports = router;