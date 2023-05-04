const nodemailer=require('../config/nodemailer');


// This is another way of exporting method

exports.newComment = (comment)=>{
let htmlString =nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:'codeial@codingninja.com',
        to:comment.user.email,
        subject:"New comment published!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
                return;
            
        }           
         console.log('messege sent',info);
         return;

    })
}