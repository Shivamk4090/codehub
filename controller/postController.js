const commentTable = require("../model/commentSchema");
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



module.exports.destroyPost =  (req, res)=>{
    postTable.findById(req.params.id, (err, data)=>{
        if(req.user.id==data.user){
            // delete the post 
           data.remove()

           //delete the all comment 
            commentTable.deleteMany({postId:req.params.id}, (err)=>{
                if(err){
                console.log("Error deleting comments of a post", err);
                }
            })

        }


    })

    res.redirect("back")

}










