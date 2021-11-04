const mongoose = require("mongoose");
const commentTable = require("./commentSchema");
const userTable = require("./userSchema");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userTable,
  },
  commentid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: commentTable,
    },
  ],
});

const postTable = mongoose.model("postTable", postSchema);

module.exports = postTable;
