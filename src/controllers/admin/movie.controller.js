const { matchedData } = require("express-validator");
const MovieService = require("../../services/admin/movie.service");
const { StatusCodes } = require("http-status-codes");

class MovieController {
  static async index(req, res, next) {
    try {
       const movies = await MovieService.index();
       res.json({ status: true, data: movies });
    } catch (e) {
      next(e)
    }
  }

  static async show(req, res, next) {
    const id = req.params.id;
    const movie = await MovieService.show(id);
    res.json({ status: true, data: movie });
  }

  static async create(req, res, next) {
    try {
      const data = req.body;
      // const newMovie = await Movie.create(data);

      const newMovie = await MovieService.create(data);
      // connect the movie with the casts, genres and director

      res.status(StatusCodes.CREATED).json({ status: true, data: newMovie });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = matchedData(req);
      const movie = await MovieService.update({ id, data });
      res.status(StatusCodes.ACCEPTED).json({ status: true, movie });
    } catch (e) {
      next(e)
    }
  }

  static async delete(req, res, next) {
    try {
      await MovieService.delete(req.params.id);
      res.status(StatusCodes.OK).json({
        status: true,
        message: "Movie deleted",
      });
    } catch (e) {
      next(e)
    }
  }
}
module.exports = MovieController;