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
    return newMovie.populate(['director', 'casts']);
  }

  static async update({ id, data }) {
    const movie = await Movie.findById({ _id: id });
    if (!movie) {
      throw new Error("Movie not found");
    }
    // use this when almost all columns/properties can change
    // Object.assign(movie, data);
    
    // where there a lots of data to be updated but not all
    // for (const key in data) {
    //   movie[key] = data[key];
    // }

    movie.description = data.description
    movie.genres = data.genres;
    movie.casts = data.casts;
  
    await movie.save();
    return movie.populate(["director", "casts"]);
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