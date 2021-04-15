const uri = "mongodb://shivam:RV2kzFibgeW2gOHY@clusteralpha-shard-00-00.hftvx.mongodb.net:27017,clusteralpha-shard-00-01.hftvx.mongodb.net:27017,clusteralpha-shard-00-02.hftvx.mongodb.net:27017/majorProject?ssl=true&replicaSet=atlas-o0jyay-shard-0&authSource=admin&retryWrites=true&w=majority"
const express = require('express')
const Port = process.env.PORT || 3333
const db  = require('./config/mongooseConfig')
const session =  require("express-session")
const passport = require("passport")
const passportLocal = require("./config/passport-local-config")
const router = require('./router/homeRoute')
const expressLayouts =  require("express-ejs-layouts")
const app = express()
const MongoStore = require("connect-mongo");
app.use(express.urlencoded())


app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', "./view")
app.use(express.static('assets'))


//express session 
app.use(session({
    name: "codeHub",
    secret:"shivam",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60)
    },
    store: MongoStore.create({ 
        mongoUrl: uri,
        autoRemove: 'native' 
    
    })
}))

app.use(passport.initialize())
app.use(passport.session())



//
app.use(passport.setAuthenticatedUser)


//middleware functions router folder setup
app.use('/', router)









app.listen(Port, function(err){
    if(err){
        console.log("error starting the server on port : ", Port)
        return;
    }
    console.log("server is up and running on port : ", Port)
})
