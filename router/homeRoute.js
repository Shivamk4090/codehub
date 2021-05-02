const express = require('express')
const router = express.Router()
const passport = require("passport")



// router.use("/home",(req, res, next) => {
//     console.log(Date.now())
//     next()
// })



//homeController module & routes
const homeController = require('../controller/homeController')
router.get('/', homeController.home)
router.get('/home', homeController.home)




//set user route & load userController modules
const userController = require('../controller/userController')
router.get('/user/signUp', userController.signUp)
router.post('/user/create-user', userController.createUser)
router.post('/user/update',userController.updateProfile )


//router for signIn page
router.get('/user/signIn', userController.signIn)

router.post('/user/createSession',passport.authenticate('local', {
    failureRedirect: "/user/signIn",
    failureFlash: true 

}) , userController.createSession)

//post by users
const postController = require("../controller/postController")
router.post("/user/createPost", passport.checkAuthentication,postController.createPost)
router.get("/post/destroy/:id", passport.checkAuthentication, postController.destroyPost)


//comments on post by users
const commentController  =  require("../controller/commentController")
router.post("/user/comment", passport.checkAuthentication,commentController.createComment)
router.get("/comment/delete/:id", passport.checkAuthentication, commentController.deleteComment)


router.get('/user/profile/:id', passport.checkAuthentication , userController.profile)



// destroy session
router.get('/user/destroy', userController.destroy)


//invalid route handdler
router.get('*', homeController.error)

module.exports = router



