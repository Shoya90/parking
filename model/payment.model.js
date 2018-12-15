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
        type : String,
        default : Date.now()
    }
})

module.exports = mongoose.model('Payment', paymentSchema)