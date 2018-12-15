// main server entry point
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const router = require('./router')(express)

// import db address and port from configuration file
const { db, port } = require('./config/config')

// connect to database
mongoose.connect(db, { useNewUrlParser : true }, function(err, connection){
    if(err){
        return console.dir(err)
    }
    console.log('Connected to Mongo successfully!')
})

// middlewares
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/api', router)

app.listen(port, function(){
    console.log(`Server running on port ${port}`)
})
