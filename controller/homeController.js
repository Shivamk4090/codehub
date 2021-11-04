const postTable = require("../model/postSchema");
const userTable = require("../model/userSchema");

module.exports.home = async function (req, res) {
  //passport sent user in req.user after creating session
  // console.log(req.locals);

  ////single populate
  // postTable.find({}).populate("user").exec((err, data)=>{

  //     res.render('home', {postList : data})
  // })

  try {
    var users;

    await userTable.find({}, (err, data) => {
      users = data;
    });

    ////multiple  populate and nesting populate
    let post = await postTable
      .find({})
      .populate("user")
      .populate({
        path: "commentid",
        populate: {
          path: "userId",
        },
      });

    res.render("home", { postList: post, users: users });
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.home2 = function (req, res) {
  res.send(req.params.x);
};

module.exports.error = function (req, res) {
  res.send("Invalid URL \n ");
};
