const GenreService = require("../../services/admin/genre.service");
const Genre = require("../../services/admin/genre.service");

class GenreController {
  static async index(req, res) {
    try {
      const genres = await Genre.index();
      res.json({ status: true, data: genres });
    } catch (error) {
      res.status(404).json({ status: false, message: error.message });
    }
  }

  static async show(req, res) {
    const name = req.params.name;
    try {
      const genre = await GenreService.show(name);
      res.json({ status: true, data: genre });
    } catch (error) {
      res.status(404).json({ status: false, message: error });
    }
  }

  static async create(req, res) {
    const data = req.body;
    const name = req.params.name;
    try {
      const genre = await Genre.create({ name, data });
      res.status(201).json({ _id: genre });
    } catch (error) {
      res.status(401).json({ status: false, message: error });
    }
  }

  static async update(req, res) {
    const name = req.params.name;
    const data = req.body;
    try {
      const genre = await Genre.update({ name, data });
      res.status(200).json({ status: true, data: genre });
    } catch (error) {
      res.status(401).json({ status: false, message: error });
    }
  }

  static async delete(req, res) {
    const genre = await Genre.delete(req.params.name);

    res.status(204).json({ status: true, message: "Genre deleted" });
  }
}

module.exports = GenreController;
