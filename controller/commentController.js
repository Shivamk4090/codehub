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