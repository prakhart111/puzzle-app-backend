const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const secretSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ptofficial29";

//SCHEMAS
const User = require('./models/User');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: 'https://prakhar-puzzle-game.netlify.app',
    }
));


// DATABASE CONNECTION

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
mongoose.connect(uri)

app.get('/api/test', (req, res) => {
    res.json('API WORKING');
    console.log("API Running at port: " + PORT);
});

// We'll encrypt the password.
app.post('/api/register', async (req, res) => {
    const {name, email, password,avatar} = req.body;
    try{
        const newlyCreatedUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, secretSalt),
            overallGameData:{
                score:0,
            },
            prevGameData:{
                score:0,
                time:0,
                level:0,
            },
            avatar:avatar,
        });
        console.log("User Created: " + newlyCreatedUser);
        res.json(newlyCreatedUser);
    }catch(err){
        console.log(err);
        res.status(422).json(err);
    }
});

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const userFromDB = await User.findOne( {email} );
    const isAdmin = userFromDB.email === "200104078@hbtu.ac.in" ? true : false;
    const userData = {
        email: userFromDB.email,
        _id: userFromDB._id,
        isAdmin: isAdmin,
        avatar: userFromDB.avatar,
        overallGameData: userFromDB.overallGameData,
        prevGameData: userFromDB.prevGameData,
        name: userFromDB.name,
    }
    if(userFromDB){
        const isPasswordValid = bcrypt.compareSync(password, userFromDB.password);

        if(isPasswordValid){

            jwt.sign({
                email: userFromDB.email,
                _id: userFromDB._id,
            },jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token,{
                    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day
                    httpOnly:false,
                    sameSite: 'none',
                    secure: true,
                }).status(200).json(userData);
            });

        }else{
            res.status(422).json({message: "Invalid Password"});
        }
    }else{
        res.status(401).json({message: "User not found"});
    }
});

// Update User Data
app.post('/api/update', async (req, res) => {
    const {level,score,time} = req.body;
    const {token} = req.cookies;
    if(token){
        jwt.verify( token, jwtSecret, async (err, userData) => {
            if(err) throw err;
            console.log("User Verified");
            const userFromDB = await User.findOne( {_id: userData._id} );
            userFromDB.overallGameData = {
                score: (userFromDB.overallGameData.score < score) ? score : userFromDB.overallGameData.score,
            };
            userFromDB.prevGameData = {
                level:level,
                score:score,
                time:time,
            };
            await userFromDB.save();
            res.json(userFromDB);
        });
    }else{
        res.status(401).json({message: "You are not logged in"});
    }
});



//leaderboard
app.get('/api/leaderboard', async (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify( token, jwtSecret, async (err, userData) => {
            if(err) throw err;
            console.log("User Verified");
            const users = await User.find();
            const sortedUsers = users.sort((a,b) => b.overallGameData.score - a.overallGameData.score);
            res.json(sortedUsers);
        });
    }else{
        res.status(401).json({message: "You are not logged in"});
    }
});

// auto login
app.get('/api/autologin', async (req, res) => {
    const {token} = req.cookies;
    if(token && token !== ''){
        jwt.verify( token, jwtSecret, async (err, userData) => {
            if(err) throw err;
            console.log("User Verified");
            const userFromDB = await User.findOne( {_id: userData._id} );
            const isAdmin = userFromDB.email === "200104078@hbtu.ac.in" ? true : false;
            const userDataAuto = {
                email: userFromDB.email,
                _id: userFromDB._id,
                isAdmin: isAdmin,
                avatar: userFromDB.avatar,
                overallGameData: userFromDB.overallGameData,
                prevGameData: userFromDB.prevGameData,
                name: userFromDB.name,
            }
            res.status(200).json(userDataAuto);
        });
    }else{
        res.status(401).json({message: "You are not logged in"});
    }
});


//Logout
app.post('/api/logout', (req,res) => {
    res.cookie('token', '', {
          httpOnly:false,
          sameSite: 'none',
          secure: true,}
        ).json(true);
  });


//ADMIN ROUTES
// Email : 200104078@hbtu.ac.in
// Password : prakhar-tandon

app.post('/api/admin/userlist', async (req,res) => {
    const email = req.body.email;
    
    // jwt.verify( token, jwtSecret, async (err, adminData) => {
    //     if(err) throw err;
    //     if(adminData.email === "200104078@hbtu.ac.in" ){
    //         res.json( await User.find() );
    //     }else{
    //         res.status(401).json({message: "You are not an admin"});
    //     }
    // });

    if(email === "200104078@hbtu.ac.in"){
        res.json( await User.find() ); 
    }else{
        res.status(401).json({message: "You are not an admin"});
    }

  });
  




app.listen(PORT)
