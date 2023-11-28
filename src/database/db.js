const { MongoClient } = require("mongodb");
const appConfig = require('../configs/app.config')

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.url = appConfig.database_url;
        console.log('url: ', this.url)
        this.client = null;
        this.db = null;
        Database.instance = this;
    }

    async connect() {
        if (!this.client) {
            this.client = await MongoClient.connect(this.url);
            this.db = this.client.db(appConfig.database_name);
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