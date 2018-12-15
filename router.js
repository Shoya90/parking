const userController = require('./controller/user.controller')
const parkingController = require('./controller/parking.controller')
const reservationController = require('./controller/reservation.controller')
const bookingController = require('./controller/booking.controller')

function routerFunction(express){
    const router = express.Router()

    // router logic here
    router.post('/register', userController.register)
    
    router.get('/parkings', parkingController.getAvailableSpots)
    router.post('/new/spot', parkingController.createSpot)

    router.post('/reserve', reservationController.reserve)
    router.put('/reservation/cancel', reservationController.cancel)
    
    router.post('/book', bookingController.book)
    router.put('/book/end', bookingController.end)
    
    return router
}

module.exports = routerFunction