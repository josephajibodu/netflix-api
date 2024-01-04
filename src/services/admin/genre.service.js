const Genre = require("../../models/Genre");

class GenreService {
  static async index() {
    const genres = await Genre.find({});
    if (!genres) {
      throw new Error("Genres not found");
    }
    return genres;
  }
  static async show(name) {
    const genre = await Genre.findOne({ name: name });
    if (!genre) {
      throw new Error("Genre not found");
    }
    return genre;
  }
  static async create({ name, data }) {
    const genre = await Genre.findOne({ name: name });
    if (genre) {
      throw new Error("Genre already exists");
    }
    Object.assign(genre, data);
    await genre.save();
    return genre;
  }

  static async update({ name, data }) {
    const genre = await Genre.findOne({ name: name });
    if (!genre) {
      throw new Error("Genre not found");
    }
    Object.assign(genre, data);
    await genre.save();
    return genre;
  }
  static async delete(name) {
    const genre = await Genre.findOne({ name: name });
    if (!genre) {
      throw new Error("Genre not found");
    }
    await Genre.deleteOne({ name: name });
  }
}
module.exports = GenreService;