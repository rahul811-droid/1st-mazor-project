const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service:0,
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'rahul25062@gmail.com',
        password:'1999@rahul'
    }

});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers'),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template ',err);return;
            }
            mailHTML=template;
        }
     )
     return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}