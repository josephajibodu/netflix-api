const Database = require("../database/db");
const {ObjectId} = require("mongodb");

class GenreController {
    static async index(req, res) {
        const db = await Database.getDB();
        const genres = await db.collection('genres').find({}).toArray();

        res.json(genres)
    }

    static async create(req, res) {
        const db = await Database.getDB();

        const data = req.body;

        const genre = await db.collection('genres').findOne({ name: data.name });

        if (genre) {
            return res.status(400).send('Genre already exists')
        }

        const newGenre = await db.collection('genres').insertOne(data);

        res.status(201).json({_id: newGenre.insertedId, ...data })
    }

    static async update(req, res) {
        const db = await Database.getDB();

        const data = req.body;

        if (! ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid Genre Id')
        }

        const genre = await db.collection('genres').findOne({ _id: new ObjectId(req.params.id) });

        if (! genre) {
            return res.status(404).send('Genre not found')
        }

        const updatedData = await db.collection('genres').replaceOne({ _id: new ObjectId(req.params.id) }, data)

        res.json({_id: req.params.id, ...data })
    }

    static async delete(req, res) {
        const db = await Database.getDB();

        const data = req.body;

        if (! ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid Genre Id')
        }

        const genre = await db.collection('genres').findOne({ _id: new ObjectId(req.params.id) });

        if (! genre) {
            return res.status(404).send('Genre not found')
        }

        await db.collection('genres').deleteOne({ _id: new ObjectId(req.params.id) })

        res.status(204).json('Genre deleted')
    }
}

module.exports = GenreController;