const commentTable = require("../model/commentSchema")
const postTable = require("../model/postSchema")


module.exports.createComment  = (req, res)=>{
  

    postTable.findById(req.body.postId , (err, data)=>{
        
            if(err){
                console.log("error posting comment", err);
            }
            if(data){
                commentTable.create({
                    content:req.body.comment,
                    postId:req.body.postId,
                    userId:req.user._id
                }, (err, comment)=>{

                    //update the column[commentid] of postable 
                    data.commentid.push(comment)
                    data.save()
                
                } )
                
            }
    })

    
    res.redirect('/')

}


module.exports.deleteComment = (req, res) =>{

    commentTable.findById(req.params.id, (err, data)=>{
        if(err){
            console.log("Error finding the comment")
        }
        if(req.user.id == data.userId){
            ////remove the comment in commentTable
            data.remove()
            //update the commentid array from the postTable
            postTable.findByIdAndUpdate(data.postId, {$pull : {commentid: req.params.id}}, (err, post)=>{
                if(err){
                    console.log("Error updating commentId in the PostTable ");
                }
            } )

        }

    })



    res.redirect("back")
}