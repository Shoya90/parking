const Payment = require('../model/reservation.model')
const Reservation = require('../model/reservation.model')

const bookingController = {}

/**
 * req.body.userId
 * req.body.parkingId
 */
bookingController.book = function (req, res) {
    let payment = new Payment()
    payment.userId = req.body.userId
    payment.parkingId = req.body.parkingId

    Reservation.findOne({
        userId: newPayment.userId,
        parkingId: newPayment.parkingId,
        ongoing: true,
        paid: false
    },
        function (err, reservation) {
            if (err) {
                res.status(500)
                res.json({
                    message: 'error booking the spot'
                })
            }
            else if (reservation) {
                reservation.paid = true
            } else {
                payment.save(function (err, newPayment) {
                    if (err) {
                        res.status(500)
                        res.json({
                            message: 'error booking the spot'
                        })
                    }
                    else {
                        res.status(200)
                        res.json({
                            id: newPayment.id
                        })
                    }
                })
            }
        }
    )


}

/**
 * req.body.reservationId
 * req.body.uesrId
 */
bookingController.end = function (req, res) {
    //
}

module.exports = bookingController