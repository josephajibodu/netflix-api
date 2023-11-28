const Database = require('../database/db')
const appConfig = require('../configs/app.config')

module.exports = function initializeApp(app) {
    const PORT = appConfig.app_port;
    app.listen(PORT, () => {
        console.log('Listening on port '+ PORT)
    })

}