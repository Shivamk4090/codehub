module.exports.home = function(req, res){
    // console.log(req.cookies)




    
    res.render('home')
}

module.exports.home2 = function(req, res){
    res.send(req.params.x)
}


module.exports.error = function(req, res){

    res.send("Invalid URL \n ")
}

