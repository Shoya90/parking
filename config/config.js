// configuration parameters
const configuration = {
    db: 'mongodb://localhost/parking',
    port: process.env.PORT || 8080,
    MAX_RESERVE_TIME: 15 * 60 * 1000

}

module.exports = configuration
