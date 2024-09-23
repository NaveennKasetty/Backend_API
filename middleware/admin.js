const { Admin } = require("../db/index");

async function adminMiddleware(req,res,next){
    const {username,password} = req.headers

    const userSave = await Admin.findOne({
        username:username,
        password:password
    })
    if(userSave){
        next();

    }else{
        res.status(404).json({
            msg:"Admin doesn't exist"
        })
    }
}


module.exports = adminMiddleware;