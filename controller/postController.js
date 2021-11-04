const commentTable = require("../model/commentSchema");
const postTable = require("../model/postSchema");

module.exports.createPost = async (req, res) => {
  try {
    let post = await postTable.create({
      content: req.body.post,
      user: req.user._id,
    });
    if (req.xhr) {
      res.json({
        post: post,
        user: req.user,
      });
      return;
    }
    res.redirect("/");
  } catch (err) {
    console.log("Error in  creating post exception", err);
  }
};

module.exports.destroyPost = async (req, res) => {
  try {
    let data = await postTable.findById(req.params.id);
    if (!data) {
      res.redirect("back");
      return;
    }

    if (req.user.id == data.user) {
      // delete the post
      data.remove();

      //delete the all comment
      await commentTable.deleteMany({ postId: req.params.id });

      if (req.xhr) {
        res.json(req.params.id);
        return;
      }

      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
