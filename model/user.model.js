const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    license_plate : String,
    position : {
        lat : String,
        lng : String
    }
})

module.exports = mongoose.model('User', userSchema)