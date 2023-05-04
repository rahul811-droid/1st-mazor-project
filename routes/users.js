const express = require('express');
const passport = require('../config/passport-jwt-strategy');
const router = express.Router();


const usersController = require('../controllers/users_controller');

router.get('/profile/:id',checkAuthentication,  usersController.profile);
router.post('/update/:id',checkAuthentication,  usersController.update);


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);





module.exports = router;