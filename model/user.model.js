const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    license_plate : {
        type : String,
        unique : true
    },
    position : {
        lat : String,
        lng : String
    }
})

module.exports = mongoose.model('User', userSchema)