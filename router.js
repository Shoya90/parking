const userController = require('./controller/user.controller')
const parkingController = require('./controller/parking.controller')

function routerFunction(express){
    const router = express.Router()

    // router logic here
    router.post('/register', userController.register)
    router.get('/parkings', parkingController.getAvailableSpots)
    router.post('/new/spot', parkingController.createSpot)
    return router
}

module.exports = routerFunction