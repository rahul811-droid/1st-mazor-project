const mongoose=require('mongoose');
const commentShema= new mongoose,Schema({
    content:{
        type:String,
        required:true
    },
    // comments belongs to a user
    user:{
        type:mongoose.Shema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Shema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:ture
});

const comment  =mongoose.model('comment',commentShema);

module.exports=Comment;

