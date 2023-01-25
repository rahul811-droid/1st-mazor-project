const express = require('express');
const app = express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');

app.use('/',require('./routes'));
app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));

app.set('views','./views');

app.listen(port, function(err){
    if(err){
        // console.log('Error:',err);
        console.log(`Error:${err}`);
    }
    console.log(`Server is running fine on port:${port}`);
})
