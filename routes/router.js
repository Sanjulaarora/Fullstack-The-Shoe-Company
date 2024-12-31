const express = require("express");
const router = new express.Router();
const Items = require("../models/itemsSchema");
const Users = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


// get itemsData API
router.get("/getItems", async(req, res) => {
    try {
        const itemsData = await Items.find();
        //console.log(itemsData);
        res.status(201).json(itemsData);
    } catch (error) {
        console.log("error" + error.message);
    }
});


// post userSignUpData API
router.post("/postUsers", async(req, res) => {
    const {name, number, email, password, passwordAgain} = req.body;

    if(!name || !number || !email || !password || !passwordAgain) {
        res.status(422).json({error:"Please fill all the data"});
    };

    try{
        const preuser = await Users.findOne({email:email});

        if(preuser) {
            res.status(422).json({error:"This user already exists"})
        } else if(password !== passwordAgain) {
            res.status(422).json({error:"Password and Password Again do not match."})
        } else {
            const finalUser = new Users({
                name, number, email, password, passwordAgain
            });

            // password hashing process   

            const storeData = await finalUser.save();
            console.log(storeData);
            res.status(201).json(storeData);
        }

    } catch(error) {
        console.log("error" + error.message);
    }
});


//post userSignIn data API ( User SignIn)
router.post("/signIn", async(req, res) => {
    const { email, password } = req.body;

    if( !email || !password ){
        res.status(400).json({ error:"fill all the details" });
    }

    try {
        const userSignin = await Users.findOne({email:email});
        if(userSignin) {
           const isMatch = await bcrypt.compare(password, userSignin.password);
           if(!isMatch) {
              res.status(400).json({ error:"Invalid Credentials" });
            } else {
                //token generate
                const token = await userSignin.generateAuthToken();

                //cookie generate
                res.cookie("Shoecompany", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });
                res.status(201).json({ userSignin });
            }

        } else {
            res.status(400).json({ error:"User Do Not Exist"});
        }
    } catch (error) {
        res.status(400).json({ error:"Invalid Credentials"});
    }
});

// get user is login or not
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validUser = await Users.findOne({ _id: req.userID });
        console.log(validUser + "User is Signed In");
        res.status(201).json(validUser);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

//User SignOut
router.get("/sign-out", authenticate, async(req, res) => {
    try {
        const token = req.token;

        req.rootUser.tokens = req.rootUser.tokens.filter((currEle) => currEle.token !== token);

        await req.rootUser.save();

        res.clearCookie("Shoecompany", { path: "/" });

        res.status(200).json({message: "User signed out successfully"});
        console.log("User SignOut");
    } catch (error) {
        console.log("Error for User SignOut", error.message);
        res.status(500).json({error: "Sign-out failed"});
    }
});


module.exports = router;