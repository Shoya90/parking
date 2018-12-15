const Payment = require('../model/payment.model')
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

    Reservation.findOneAndUpdate({
        userId: req.body.userId,
        parkingId: req.body.parkingId,
        ongoing: true,
        paid: false
    },
        {
            $set: {
                paid: true,
                paymentId: payment.id
            }
        }
    )
        .then(function (reservation) {
            if (reservation) {

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
            else {
                res.status(400)
                res.json({
                    message: 'bad request, already paid or ended'
                })
            }
        })
        .catch(function (err) {
            res.status(500)
            res.json({
                message: 'error booking the spot'
            })
        })


}

/**
 * req.body.paymentId
 */
bookingController.end = function (req, res) {
    Reservation.findOneAndDelete({
        paymentId: req.body.paymentId,
        ongoing: true,
        paid: true
    }
    )
        .then(function (reservation) {
            if (reservation) {
                res.status(200)
                res.json({
                    reservation: reservation
                })
            }
            else {
                res.status(400)
                res.json({
                    message: 'bad request, already paid or ended'
                })
            }
        })
        .catch(function (err) {
            res.status(500)
            res.json({
                message: 'error ending the booking'
            })
        })
}

module.exports = bookingController