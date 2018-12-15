const userController = require('./controller/user.controller')
const parkingController = require('./controller/parking.controller')
const reservationController = require('./controller/reservation.controller')
const bookingController = require('./controller/booking.controller')

function routerFunction(express){
    const router = express.Router()

    // user 
    router.post('/register', userController.register)
    
    // parking
    router.get('/parkings', parkingController.getAvailableSpots)
    router.post('/new/spot', parkingController.createSpot)

    // reserve
    router.post('/reserve', reservationController.reserve)
    router.put('/reservation/cancel', reservationController.cancel)
    
    // book
    router.post('/book', bookingController.book)
    router.put('/book/end', bookingController.end)
    
    return router
}

module.exports = routerFunction