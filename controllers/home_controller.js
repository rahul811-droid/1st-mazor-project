const Post =require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    try{
        // populate the user of each post
        let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'Comment',
        populate:{
            path:'user'
        }
    });
    let users= await User.find({});
    return res.render('home', {
        title: "codeial ! Home",
        posts:posts,
        all_users:users
    });
    }catch(err){
        console.log('Error',err);
        return;


    }
//    populate the user of each post

    
   
    
   
}






// module.exports.actionName = function(req, res){}