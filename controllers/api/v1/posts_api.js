    const Post=require('../../../models/post');
    const Comment=require('../../../models/comment');




module.exports.index=  async function(req,res){

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'Comment',
        populate:{
            path:'user'
        }
    });



    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy = async function(req,res){
    try{

        let posts=await Post.findById(req.params.id)
    // .id means converting the object id into string
   
if(post.user==req.user.id){
    post.remove();

    await Comment.deleteMany({post:req.params.id})
  
    
        return res.json(200,{
            message:"Post and associated comments deleted successfully!"
        });
    
}else{
    return res.json(401,{
        message:"You can not delete this post !"
    });
}
    }catch(err){
        // console.log('Error',err);
        console.log('*****',err);
        return res.json(500,{

            message:"Internal Server Error"
        });
    }

    
}