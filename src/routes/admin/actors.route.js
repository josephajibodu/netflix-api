
const express = require('express');
const router = express.Router();
const HomeController = require('../../controllers/admin/actor.controller')

router.get('/', HomeController.index);

router.get('/:id', HomeController.show);

router.post('/', HomeController.create);

router.put('/:id', HomeController.update);

router.delete('/:id', HomeController.delete);

module.exports = router;