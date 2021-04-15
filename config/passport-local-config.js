const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userTable = require('../model/userSchema')



passport.use(new LocalStrategy({
    usernameField : 'email' }, (email,password, done)=>{
        userTable.findOne({email:email}, (err, data)=>{
            if(err){
                console.log(err);
                done(err)
                return
            }
            if(!data || data.password != password){
                console.log(data.password + password)
                console.log("No data or wrong password")
                done(null, false)
                return
            }
            
            done(null, data)
            return
        })
    }))



//for setting id in cookies & encryption while sign In
passport.serializeUser((data, done)=>{
    done(null, data.id)
})


//decrypt id in cookies 
passport.deserializeUser((id, done)=>{
   
    userTable.findById(id, (err, data)=>{
        if(err){
            console.log("Error scanning user in usertable");
            done(err)
            return
        }
        done(null, data)
        return
    })
})


module.exports = passport


//
passport.checkAuthentication  = (req, res, next) =>{
    if(req.isAuthenticated()){
        next()
        return
    }
    res.redirect("/user/signIn")
    return
}


//
passport.setAuthenticatedUser = (req, res, next)=>{


    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
   
    next()
}




