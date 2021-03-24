const express = require('express')
const cookieParser = require("cookie-parser")
const router = require('./router/homeRoute')
const Port = process.env.Port || 3333
const db  = require('./config/mongooseConfig')
const app = express()
app.use(express.urlencoded())
app.use(cookieParser())




app.set('view engine', 'ejs')
app.set('views', "./view")


//middleware functions router folder setup
app.use('/', router)









app.listen(Port, function(err){
    if(err){
        console.log("error starting the server on port : ", Port)
        return;
    }
    console.log("server is up and running on port : ", Port)
})