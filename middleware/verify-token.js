const jwt= require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const token= req.headers['x-access-token'] 
                || req.body.token
                || req.query.token
    
    if (token) {
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                next({status: false, message: 'Failed to authenticate token', code: 93})
            }else{
                req.decode= decoded,
                next()
            }
        })
    }else{
        next({status: false, message: 'No token provided.', code: 94})
    }
}

