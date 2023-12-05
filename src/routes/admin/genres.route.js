
const express = require('express');
const router = express.Router();
const GenreController = require('../../controllers/admin/genre.controller')

router.get('/', GenreController.index);

router.post('/', GenreController.create);

router.put('/:id', GenreController.update);

router.delete('/:id', GenreController.delete);

module.exports = router;