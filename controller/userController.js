const userTable = require("../model/userSchema");

//render sign up page
module.exports.signUp = function (req, res) {
  res.render("signUp");
};
//render signIn page
module.exports.signIn = (req, res) => {
  res.render("signIn");
};

//add new user to database
module.exports.createUser = async (req, res) => {
  try {
    //password != confirm Password
    if (req.body.password != req.body.confirmPassword) {
      res.redirect("back");
      return;
    }

    /////check if user already exits
    let data = await userTable.findOne({ email: req.body.email });

    //user already exits
    if (data) {
      res.redirect("back");
      return;
    }
    // if above 2 condtion false create a new user

    await userTable.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.redirect("/user/signIn");
  } catch (error) {
    console.log(error);
  }
};

//create session for the user
module.exports.createSession = (req, res) => {
  res.redirect("/");
};

module.exports.destroy = (req, res) => {
  req.logout();
  res.redirect("/");
};

//render profile page of signed in user
module.exports.profile = (req, res) => {
  userTable.findById(req.params.id, (err, data) => {
    res.render("profile", {
      email: data.email,
      name: data.name,
      id: data.id,
    });
  });
};

module.exports.updateProfile = (req, res) => {
  // userTable.findByIdAndUpdate(req.user.id, {name:req.body.name,email:req.body.email},  )
  //or since req.body ==  {name:req.body.name,email:req.body.email}
  userTable.findByIdAndUpdate(req.user.id, req.body, (err, data) => {
    if (err) {
      console.log("Error updating the user");
    }
  });

  res.redirect("back");
};
