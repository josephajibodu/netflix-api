const Database = require('./db')

module.exports = function initializeApp(app) {
    Database.getDB().catch((error) => {
        throw error;
    })

    Database.getDB().catch((error) => {
        throw error;
    })
    Database.getDB().catch((error) => {
        throw error;
    })
    Database.getDB().catch((error) => {
        throw error;
    })
    Database.getDB().catch((error) => {
        throw error;
    })

    const PORT = process.env.APP_PORT;
    app.listen(PORT, () => {
        console.log('Listening on port '+ PORT)
    })

}