const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    parking_number : {
        type : Number
    },
    position : {
        lat : String,
        lng : String
    },
    cost_per_hour : Number
})

module.exports = mongoose.model('Parking', parkingSchema)