const jwt = require("jsonwebtoken");
const config = require("config");
exports.verifyAuthenticationCustomer =(req,res,next)=>{
    const {token} = req.headers;
    if (token){
        const verifyToken = token.split(" ")[1];
        jwt.verify(verifyToken,config.get("app.jwtAccessKey"),(error, customer)=>{
            if(error){
                return res.status(401).json("Authentication failed");
            }
            next();
        });
    }
    else{
        return res.status(403).json("Authentication required");
    }
};