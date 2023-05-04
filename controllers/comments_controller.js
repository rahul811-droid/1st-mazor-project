const comment= require('../models/comment');
const post =require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');


mudule.exports.create = async function(req,res){
    try{

        let post=await post.findById(req.body.post,function(err,post){
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },
                function(err,comment){
                    // handdle err
                    post.comments.push(comment);
                    post.save();
                    res.redirect('./');
                }
                )
            }
        })
    }catch{
        console.log(('Error'),err);
        return;
    }
   
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.paramas.id,function(err,comment){
            if(comment.user==req.user.id){
                let postId = comment.post;
                comment.remove();
    
                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
        })
    }
    catch{
        console.log('Error',err);
        return;
    }
   
}