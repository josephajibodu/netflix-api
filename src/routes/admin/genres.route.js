const express = require('express');
const router = express.Router();


// Genre Schema
// - name
// - description

router.get('/', function (req, res) {
    res.send('all')
});

router.get('/:name', function (req, res) {
    res.send('single')
});

router.post('/', function (req, res) {
    res.send('create')
});

router.put('/:name', function (req, res) {
    res.send('update')
});

router.delete('/:name', function (req, res) {
    res.send('delete')
});

module.exports = router;