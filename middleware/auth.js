const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    // check for token

    if(!token) return res.status(401).json({ msg: 'No token, Authorization denied.'});
        try{
             // verify token
            const decoded = jwt.verify(token, config.get('jwtSecret'));    
         
            // Add user from payload
            req.user = decoded;
            next();  
        } catch(e){
            res.status(401).json({ msg: ' Invalid token, Authorization denied'});
        } 
}

module.exports = auth;