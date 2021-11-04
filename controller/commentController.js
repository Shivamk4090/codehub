const commentTable = require("../model/commentSchema");
const postTable = require("../model/postSchema");

module.exports.createComment = async (req, res) => {
  try {
    let data = await postTable.findById(req.body.postId);

    if (data) {
      let comment = await commentTable.create({
        content: req.body.comment,
        postId: req.body.postId,
        userId: req.user._id,
      });

      //update the column[commentid] of postable
      data.commentid.push(comment);
      data.save();
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    let data = await commentTable.findById(req.params.id);

    if (req.user.id == data.userId) {
      ////remove the comment in commentTable
      data.remove();
      //update the commentid array from the postTable
      await postTable.findByIdAndUpdate(
        data.postId,
        { $pull: { commentid: req.params.id } },
        (err, post) => {
          if (err) {
            console.log("Error updating commentId in the PostTable ");
          }
        }
      );
    }

    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};
