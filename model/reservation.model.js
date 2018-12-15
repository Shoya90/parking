const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    userId : { 
        type : mongoose.Schema.ObjectId, 
        ref : 'User',
        required : true
    },
    parkingId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Parking',
        required : true
    },
    ongoing : {
        type : Boolean,
        default : true
    },
    paid : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)