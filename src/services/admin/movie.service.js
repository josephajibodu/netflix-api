const Movie = require("../../models/Movie");

class MovieService {
  static async index() {
    const movies = await Movie.find({});
    if (!movies) {
      throw new Error("Movies not found");
    }
    return movies;
  }

  static async show(id) {
    const movie = await Movie.findById({ _id: id })
      .populate("director")
      .populate("casts");
      
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  }
  static async create(data) {
    const newMovie = new Movie(data);
    await newMovie.save();
    return newMovie;
  }

  static async update({ id, data }) {
    const movie = await Movie.findById({ _id: id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    Object.assign(movie, data);
    await movie.save();
    return movie;
  }

  static async delete(id) {
    const movie = await Movie.findById({ _id: id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    await Movie.deleteOne({ _id: id });
  }
}

module.exports = MovieService;