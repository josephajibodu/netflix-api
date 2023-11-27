const { MongoClient } = require("mongodb");

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.url = 'mongodb://localhost:27017';
        this.client = null;
        this.db = null;
        Database.instance = this;
    }

    async connect() {
        if (!this.client) {
            this.client = await MongoClient.connect(this.url);
            this.db = this.client.db('netflix');
            console.log("Connected to MongoDB");
        }
        return this.db;
    }

    async getDB() {
        if (!this.db) {
            await this.connect();
        }
        return this.db;
    }
}

module.exports = new Database();