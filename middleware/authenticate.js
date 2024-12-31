const jwt = require("jsonwebtoken");
const Users = require("../models/usersSchema");
const secretKey = process.env.KEY;

const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.Shoecompany;
        const verifyToken = jwt.verify(token, secretKey);
        const rootUser = await Users.findOne({_id:verifyToken._id,"tokens.token":token});
       
        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  

    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = authenticate;