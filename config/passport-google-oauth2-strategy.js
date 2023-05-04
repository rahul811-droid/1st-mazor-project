const passport =require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

// tell passsport to a new strategy for google log in

passport.use(new googleStrategy({
    clientID:"508311836884-jnj3r5co762sscfkjs9mnv4bollobdtn.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    
},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google startegy-passport',err);
                return ;
            }
            console.log(profile);

            if(user){
                // if found , set this user as req.user

                return done(null,user);

            }else{

                // if not found , create the user and set it as req.user
                
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user google-strategy-passport',err);
                        return ;
                    }
                    return done(null.user);
                })
            }

        })
    }

))

module.exports=passport;