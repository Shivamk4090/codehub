const userTable  = require('../model/userSchema')


//render sign up page
module.exports.signUp = function(req, res){
    if(req.cookies.id != null){
        res.redirect('/user/profile')
        return
    }

    res.render('signUp')
}
//render signIn page
module.exports.signIn = (req, res)=>{
    if(req.cookies.id != null){
        res.redirect('/user/profile')
        return
    }
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
module.exports.validateUser = (req, res)=>{

    userTable.findOne({email:req.body.email},(err, data)=>
    {
        if(err){
            console.log("Error scanning userTable")
            return
        }
        if(!data){
            res.redirect('back')
            return
        }else{
            if(req.body.password != data.password){
                res.redirect('back')
                return
            }
             res.cookie('id', data.id)
             res.redirect('/user/profile')
        }
    })
    
}


//render profile page of signed in user
module.exports.profile = (req, res)=>{
    userTable.findById(req.cookies.id, (err, data)=>{
        if(err){
            console.log("Error scanning userTable")
            return
        }
        if(!data){
            res.redirect('/user/signIn')
            return
        }else{
            res.render('profile', {email:data.email,name:data.name})
        }
        
    })

    
}


//Logout handler
module.exports.Logout   =  (req, res)=>{
    res.clearCookie('id')
    res.redirect('/user/signIn')
}