const express = require('express');
const router = express.Router();


// Movie Schema
// - title
// - description
// - release_year
// - genres
// - duration
// - casts (list of users)
// - director (a user)


router.get('/', function (req, res) {
    res.send('all')
});

router.get('/:title', function (req, res) {
    res.send('single')
});

router.post('/', function (req, res) {
    res.send('create')
});

router.put('/:title', function (req, res) {
    res.send('update')
});

router.delete('/:title', function (req, res) {
    res.send('delete')
});

module.exports = router;