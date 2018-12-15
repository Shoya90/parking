const cron = require('node-cron')
const Reservation = require('./model/reservation.model')
const { MAX_RESERVE_TIME } = require('./config/config')

module.exports = function () {
    cron.schedule('*/1 * * * *',
        function () {
            Reservation.deleteMany({
                paid: false,
                ongoing: true,
                created_at: {
                    $lt: Date.now() - MAX_RESERVE_TIME
                }
            })
            .then(function (reservations) {
                if (reservations) {
                    console.log('deleted unused parking spots')
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        })

}