const postTable = require("../model/postSchema")




module.exports.createPost  =  (req, res)=>{
    try{
        postTable.create({
            content:req.body.post,
            user:req.user._id
        }, (err, data)=>{
            if(err){
                console.log("Error in  creating post ");
                return res.redirect("back");
            }
        })

    }catch  {
        console.log("Error in  creating post exception");

    }

    res.redirect("/")
    
}














