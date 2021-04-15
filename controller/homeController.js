module.exports.home = function(req, res){
    //passport sent user in req.user after creating session
    // console.log(req.locals);
    res.render('home')
}

module.exports.home2 = function(req, res){
    res.send(req.params.x)
}


module.exports.error = function(req, res){

    res.send("Invalid URL \n ")
}

