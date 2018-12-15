const User = require('../model/user.model')

const userController = {}

/**
 * @ req.body.license_plate
 * @ req.body.position
 */
userController.register = function (req, res) {
    let user = new User()
    user.license_plate = req.body.license_plate
    user.position = req.body.position
    user.save(function (err, newUser) {
        if (err) {
            res.status(500)
            res.json({
                message: 'error creating user'
            })
        }
        else {
            res.status(200)
            res.json({
                license_plate: newUser.license_plate,
                id: newUser.id
            })
        }
    })
}

module.exports = userController