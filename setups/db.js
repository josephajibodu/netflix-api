const {MongoClient} = require("mongodb");


async function connect() {
    const url = 'mongodb://localhost:27017';
    const client = await MongoClient.connect(url);
    db = client.db('netflix');

    console.log("connect called ... ")
}

Database = {
    // ensure that we have just one instance of this
    db: null,

    getDB : async function() {
        if (! this.db) {
            await connect()
            return this.db;
        }
        return this.db;
    }
}

module.exports = Database