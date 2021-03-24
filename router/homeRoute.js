const express = require('express')
const router = express.Router()



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



//router for signIn page
router.get('/user/signIn', userController.signIn)
router.post('/user/validate-user', userController.validateUser)
router.get('/user/profile', userController.profile)
router.get('/user/Logout', userController.Logout)





//invalid route handdler
router.get('*', homeController.error)

module.exports = router



