const Parking = require('../model/parking.model')
const Reservation = require('../model/reservation.model')

// an arbitrary distance value 
const MINIMUN_DISTANCE = 2000

const parkingController = {}
/**
 * req.body.userId
 * req.body.parkingId
 */
parkingController.getAvailableSpots = function (req, res) {
    var all_parkings = []
    var free_parkings = []
    var reserved_ids = []
    var user_position = {
        lat : req.query.lat,
        lng : req.query.lng
    }
    Parking.find({})
        .then(function(parkings){
            all_parkings = parkings
            return Reservation.find({})
        })
        .then(function(reservations){
            reserved_ids = reservations.map(reservation => reservation.parkingId)
            free_parkings = all_parkings.filter(parking => {return reserved_ids.indexOf(parking.id) < 0 && isSpotNear(parking, user_position)})
            res.json(free_parkings)
        })
        .catch(function(err){
            console.log(err)
            res.status(500)
            res.json({
                message: 'error getting free spots'
            })
        })

}

parkingController.createSpot = function(req, res){
    let p = new Parking()
    p.parking_number = req.body.parking_number,
    p.position.lat = req.body.lat
    p.position.lng = req.body.lng
    p.cost_per_hour = req.body.cost_per_hour

    p.save(function(err, newSpot){
        if (err) {
            res.status(500)
            res.json({
                message: 'error creating spot'
            })
        }
        else {
            res.status(200)
            res.json({
                id: newSpot.id
            })
        }
    })
}

function isSpotNear(spot, user_position){
    let deltaX = Math.pow((user_position.lat - spot.position.lat), 2)
    let deltaY = Math.pow((user_position.lng - spot.position.lng), 2)
    let result = Math.sqrt(deltaX + deltaY)
    if(result > MINIMUN_DISTANCE){
        return false
    }
    else{
        return true
    }
}

module.exports = parkingController