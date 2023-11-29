const Database = require('../database/db')
const configs = require('../configs')

module.exports = function initializeApp(app) {
    const PORT = configs.app_port;
    app.listen(PORT, () => {
        console.log('Listening on port '+ PORT)
    })

}