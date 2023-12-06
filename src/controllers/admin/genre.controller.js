const Genre = require("../../models/Genre");

class GenreController {
    static async index(req, res) {
        const genres = await Genre.find();
        if (!genres) {
            return res
                .status(404)
                .json({ status: false, message: "genres not found" });
        }

        res.json({ status: true, data: genres });
    }

    static async show(req, res) {
        const genre = await Genre.findById({ _id: req.params.id });
        if (!genre) {
            return res.status(404).send({
                message: "Genre not found",
            });
        }
        res.json({ status: true, data: genre });
    }

    static async create(req, res) {
        const data = req.body;

        const genre = await Genre.findById({ id: req.param.id });
        if (genre) {
            return res.status(400).send("Genre already exist");
        }
        const newGenre = new Genre(data);
        await newGenre.save();

        res.status(201).json({ _id: newGenre.insertedId, ...data });
    }

    static async update(req, res) {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).send("Genre not found");
        }
        const data = req.body;
        Object.assign(genre, data);
        await genre.save();

        res.status(201).json({ status: true, data: genre });
    }

    static async delete(req, res) {
        const genre = await Genre.findById({ _id: req.params.id });
        if (!genre) {
            return res.status(404).send("Genre not found");
        }
        await Genre.deleteOne({ _id: req.params.id });
        res.status(204).json({ status: true, message: "Genre deleted" });
    }
}

module.exports = GenreController;