const Database = require("../database/db");
const {ObjectId} = require("mongodb");

class Movie {
    static async findById(id) {
        const db = await Database.getDB();

        return await db.collection("movies").findOne({
            _id: new ObjectId(id),
        });
    }

    static async create(data) {
        const db = await Database.getDB();

        const newInsertion = await db.collection("movies").insertOne(data);

        return await this.findById(newInsertion.insertedId);
    }
}

module.exports = Movie