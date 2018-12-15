const Reservation = require('../model/reservation.model')

const reservationController = {}

/**
 * req.body.userId
 * req.body.parkingId
 */
reservationController.reserve = function (req, res) {
    let reservation = new Reservation()
    reservation.userId = req.body.userId
    reservation.parkingId = req.body.parkingId

    reservation.save(function(err, newReservation){
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

/**
 * req.body.reservationId
 * req.body.uesrId
 */
reservationController.cancel = function(req, res){
    Reservation.findOneAndUpdate(
        {
            userId : req.body.userId,
            _id : req.body.reservationId
        }, 
        {
            $set : {
                ongoing : false
            }
        },
        {
            new : true
        },
        function(err, reservation){
            if (err) {
                res.status(500)
                res.json({
                    message: 'error reserving the spot'
                })
            }
            else {
                res.status(200)
                res.json({
                    reservation: reservation
                })
            }
        })
}

module.exports = reservationController