const MovieService = require("../../services/admin/movie.service");
const { StatusCodes } = require("http-status-codes");

class MovieController {
  static async index(req, res) {
    const movies = await MovieService.index();

    res.json({ status: true, data: movies });
  }

  static async show(req, res) {
    const id = req.params.id;
    const movie = await MovieService.show(id);
    res.json({ status: true, data: movie });
  }

  static async create(req, res) {
    const data = req.body;
    // const newMovie = await Movie.create(data);

    const newMovie = await MovieService.create(data);
    // connect the movie with the casts, genres and director

    res.status(StatusCodes.CREATED).json(newMovie);
  }

  static async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const movie = await MovieService.update({ id, data });
    res.status(StatusCodes.ACCEPTED).json({ status: true, movie });
  }

  static async delete(req, res) {
    await MovieService.delete(req.params.id);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Movie deleted",
    });
  }
}
module.exports = MovieController;