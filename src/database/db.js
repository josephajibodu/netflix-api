const { MongoClient } = require("mongodb");
const configs = require('../configs')

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.url = configs.database_url;
        this.client = null;
        this.db = null;
        Database.instance = this;
    }

    async connect() {
        if (!this.client) {
            this.client = await MongoClient.connect(this.url);
            this.db = this.client.db(configs.database_name);
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