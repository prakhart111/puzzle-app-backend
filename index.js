const express = require('express');
const app = express();
const cors = require('cors');

const bcrypt = require('bcryptjs');
const secretSalt = bcrypt.genSaltSync(10);

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
        });
        console.log("User Created: " + newlyCreatedUser);
        res.json(newlyCreatedUser);
    }catch(err){
        console.log(err);
        res.status(422).json(e)
    }
});

//MONGO DB CONNECTION 
//Username : ptofficial29
//PASSWORD : F3hjG5zdLOWrJvcP

app.listen(PORT)