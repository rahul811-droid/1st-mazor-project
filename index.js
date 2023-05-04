const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle= require('./config/passport-google-oauth2-strategy');

const flash =require('connect-flash');
const customMware=require('./config/middlewire');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads the available to the browswe

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(flash());
app.use(customMware.setFlash);
// use express router

app.use('/', require('./routes'));



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db





app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
