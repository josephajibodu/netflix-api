const GenreService = require("../../services/admin/genre.service");
const Genre = require("../../services/admin/genre.service");

class GenreController {
  static async index(req, res, next) {
    try {
      const genres = await Genre.index();
      res.json({ status: true, data: genres });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    const name = req.params.name;
    try {
      const genre = await GenreService.show(name);
      res.json({ status: true, data: genre });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const data = req.body;
    const name = req.params.name;
    try {
      const genre = await Genre.create({ name, data });
      res.status(201).json({ _id: genre });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const name = req.params.name;
    const data = req.body;
    try {
      const genre = await Genre.update({ name, data });
      res.status(200).json({ status: true, data: genre });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await Genre.delete(req.params.name);

      res.status(204).json({ status: true, message: "Genre deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
