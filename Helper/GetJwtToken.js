const jwt = require('jsonwebtoken')

module.exports =(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRETKEY,{expiresIn : '4h'})
}
