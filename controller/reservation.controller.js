const Reservation = require('../model/reservation.model')
const Parking = require('../model/parking.model')

const reservationController = {}

/**
 * req.body.userId
 * req.body.parkingId
 */
reservationController.reserve = function (req, res) {
    let reservation = new Reservation()
    reservation.userId = req.body.userId
    reservation.parkingId = req.body.parkingId

    Reservation.find({
        $or: [
            {
                userId : req.body.userId,
                ongoing : true
            },
            {
                parkingId: req.body.parkingId,
                ongoing: true
            }
        ]
    })
        .then(function (reservations) {
            if (reservations.length > 0) {
                res.status(406)
                res.json({
                    message: 'the spot is not available'
                })
            }
            else {
                reservation.save(function (err, newReservation) {
                    if (err) {
                        res.status(500)
                        res.json({
                            message: 'error reserving the spot'
                        })
                    }
                    else {
                        res.status(200)
                        res.json({
                            id: newReservation.id
                        })
                    }
                })
            }
        })
        .catch(function (err) {
            res.status(500)
            res.json({
                message: 'error reserving the spot'
            })
        })

}

/**
 * req.body.reservationId
 * req.body.uesrId
 */
reservationController.cancel = function (req, res) {
    Reservation.findOneAndUpdate(
        {
            userId: req.body.userId,
            _id: req.body.reservationId
        },
        {
            $set: {
                ongoing: false
            }
        },
        {
            new: true
        })
        .then(function (reservation) {
            res.status(200)
            res.json({
                reservation: reservation
            })
        })
        .catch(function (err) {
            res.status(500)
            res.json({
                message: 'error reserving the spot'
            })
        })
}

module.exports = reservationController