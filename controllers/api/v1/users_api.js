const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession =async  function(req, res){
   
   
   try{

    let user =   await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password ){
        return res.json(422,{
            messege:"Invalid username or password"
        });

    }
    return res.json(200,{
        messege:'Sign in successfull,here is your token ,please keep it safe!',
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
        }
    })

   } catch(err){

    console.log('*******',err);
        return res.json(500,{
            messege:"Internal server Error"
        })
    
   }

}
