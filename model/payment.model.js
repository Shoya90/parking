const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
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
    created_at : {
        type : Date,
        default : Date.now()
    },
    total_time_hours : Number,
    total_cost : Number
})

module.exports = mongoose.model('Payment', paymentSchema)