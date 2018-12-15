const Parking = require('../model/parking.model')
const Reservation = require('../model/reservation.model')
const { MAX_RESERVE_TIME } = require('../config/config')
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
            free_parkings = all_parkings.filter(parking => {return isSpotFree(parking.id, reservations) && isSpotNear(parking, user_position)})
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

function isSpotFree(parking_id, reservations){
    var reserved_ids = reservations.map(reservation => String(reservation.parkingId))
    var index = reserved_ids.indexOf(parking_id)
    if(index < 0){
        return true
    }
    else{
        let reservation = reservations[index]
        let remaining_time = reservation.created_at - Date.now()
        if(reservation.paid && reservation.ongoing){
            return false
        }
        else if(!reservation.ongoing){
            return true
        }
        else if(remaining_time > MAX_RESERVE_TIME && !reservation.paid){
            return true
        }
        
        // return !reservations[index].ongoing
    }
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