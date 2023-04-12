const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const secretSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ptofficial29";

//SCHEMAS
const User = require('./models/User');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


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
    const {name, email, password} = req.body;
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
            avatar:"",
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
    if(userFromDB){
        const isPasswordValid = bcrypt.compareSync(password, userFromDB.password);

        if(isPasswordValid){

            jwt.sign({
                email: userFromDB.email,
                _id: userFromDB._id,
            },jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json("Password is valid");
            });

        }else{
            res.status(422).json({message: "Invalid Password"});
        }
    }else{
        res.status(401).json({message: "User not found"});
    }
});

//ADMIN ROUTES
// Email : 200104078@hbtu.ac.in
// Password : prakhar-tandon

app.post('/api/admin/userlist', async (req,res) => {
    const token = req.body.cookies;
    
    jwt.verify( token, jwtSecret, async (err, adminData) => {
        if(err) throw err;
        if(adminData.email === "200104078@hbtu.ac.in" ){
            res.json( await User.find() );
        }else{
            res.status(401).json({message: "You are not an admin"});
        }
    });

  });
  


//MONGO DB CONNECTION 
//Username : ptofficial29
//PASSWORD : F3hjG5zdLOWrJvcP

app.listen(PORT)