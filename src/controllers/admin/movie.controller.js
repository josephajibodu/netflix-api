const Movie = require("../../models/Movie");

class MovieController {
    static async index(req, res) {
        const movies = await Movie.find({});
        if (!movies) {
            return res
                .status(404)
                .json({ status: false, message: "Movies not found" });
        }

        res.json({ status: true, data: movies });
    }

    static async show(req, res) {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        res.json({ status: true, data: movie });
    }

    static async create(req, res) {
        const data = req.body;
        // const newMovie = await Movie.create(data);

        const newMovie = new Movie(data);
        await newMovie.save();
        // connect the movie with the casts, genres and director

        res.status(201).json(newMovie);
    }

    static async update(req, res) {
        const movie = await Movie.findById({
            _id: req.params.id,
        });

        if (!movie) {
            return res.status(404).send("Movie not found");
        }

        const data = req.body;
        Object.assign(movie, data);
        await movie.save();

        res.status(200).json({ status: true, movie });
    }

    static async delete(req, res) {
        const movie = await Movie.findById({ _id: req.params.id });
        if (!movie) {
            return res.status(400).send("Movie not found");
        }

        await Movie.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: false,
            message: "Movie deleted",
        });
    }
}
module.exports = MovieController;