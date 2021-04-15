const userTable  = require('../model/userSchema')


//render sign up page
module.exports.signUp = function(req, res){

    

    res.render('signUp')
}
//render signIn page
module.exports.signIn = (req, res)=>{
    res.render('signIn')
}


//add new user to database
module.exports.createUser = (req, res)=>{

    //password != confirm Password
    if(req.body.password != req.body.confirmPassword){
        res.redirect('back')
        return
    }

    /////check if user already exits
    userTable.findOne({email:req.body.email}, (err, data)=>{
        if(err){
            console.log("Error scanning userTable")
            return
        }
        //user already exits
        if(data){  
            res.redirect('back')
            return
        }
        // if above 2 condtion false create a new user
        else{
            userTable.create({
                name: req.body.name,
                email : req.body.email, 
                password: req.body.password}, (err, data)=>{
                if(err){
                    console.log("error creating user");
                    return
                }
                res.redirect('/user/signIn')
            })
        }
    })
    console.log(req.body)    
}


//create session for the user
module.exports.createSession = (req, res)=>{
    res.redirect('/')
}

module.exports.destroy = (req, res) => {
    req.logout()
    res.redirect('/')
}


//render profile page of signed in user
module.exports.profile = (req, res)=>{
    res.render('profile', {
        email:res.locals.user.email,
        name : res.locals.user.name
    })
}
