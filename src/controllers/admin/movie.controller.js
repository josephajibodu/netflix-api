const Database = require("../../database/db");
const {ObjectId} = require("mongodb");
const Movie = require('../../models/Movie')

class MovieController {

    static async index(req, res) {
        const movies = await Movie.find({});

        res.json({ status: true, data: movies });
    }

    static async show(req, res) {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
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

        res.status(201).json(newMovie)
    }

    static async update(req, res) {
        const db = await Database.getDB();
        const movie = (await db.collection("movies")).findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!movie) {
            return res.status(404).send("Movie not found");
        }

        const data = req.body;
        db.collection("movies").replaceOne({ title: req.params.title }, data);

        res.status(201).json({...movie, ...data})
    }

    static async delete(req, res) {
        const db = await Database.getDB();
        const movie = await db.collection("movies").findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!movie) {
            return res.status(400).send("Movie not found");
        }

        await db.collection("movies").deleteOne({ title: req.params.title });
        res.status(204).json({
            message: "Movie deleted"
        });
    }
}
module.exports = MovieController;