const postTable = require("../model/postSchema")
const userTable = require("../model/userSchema")

module.exports.home = function(req, res){
    //passport sent user in req.user after creating session
    // console.log(req.locals);


    ////single populate
    // postTable.find({}).populate("user").exec((err, data)=>{
      
    //     res.render('home', {postList : data})
    // })
    var  users= new Array();

    userTable.find({}, (err, data)=>{
        for(x of data){
            users.push(x.name)
        }

    })
    


    ////multiple  populate and nesting populate
    postTable.find({})
    .populate("user")
    .populate({
        path:"commentid",
        populate:{
            path:"userId"
        }

    })
    .exec((err, data)=>{
        res.render('home', {postList : data, users : users})
    })



}

module.exports.home2 = function(req, res){
    res.send(req.params.x)
}


module.exports.error = function(req, res){

    res.send("Invalid URL \n ")
}

