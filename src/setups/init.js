const configs = require('../configs')
const mongoose = require("mongoose");

module.exports = function initializeApp(app) {
    async function run() {
        await mongoose.connect(`${configs.database_url}/${configs.database_name}`);

        const PORT = configs.app_port;
        app.listen(PORT, () => {
            console.log('Listening on port '+ PORT)
        })
    }
    run().catch(console.log);
}