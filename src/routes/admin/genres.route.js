
const express = require('express');
const router = express.Router();
const GenreController = require('../../controllers/admin/genre.controller')
const IsAuthenticated = require("../../middlewares/IsAuthenticated");

router.get('/', IsAuthenticated, GenreController.index);

router.post('/', IsAuthenticated, GenreController.create);

router.put('/:id', IsAuthenticated, GenreController.update);

router.delete('/:id', IsAuthenticated, GenreController.delete);

module.exports = router;