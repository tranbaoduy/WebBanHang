const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
   
    const authHeader = req.header('authorization')
    
    const token =authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.sendStatus(401)
            req.user = user 
            next()
        })
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
