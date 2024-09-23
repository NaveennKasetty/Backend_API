const {  User } = require("../db/index");

async function userMiddleware(req,res,next){
    const {username, password} = req.headers

   const userData = await  User.findOne({
        username:username,
        password:password
    })
    try{
        if(userData){
            next();
        }
    }catch(error){
        res.status(404).json({
            msg:error.msg
        })
    }


    // .then(function (value){
    //     if(value){
    //         next();
    //     }else{
    //         res.status(404).json({
    //            msg:"User doesn't exist"
    //         })
    //     }
    // })

}


module.exports = userMiddleware;