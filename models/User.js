const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
    prevGameData:{
        score:Number,
        time:Number,
        level:Number,
    },
    overallGameData:{
        score:Number,
    },
    avatar:String,
});

module.exports = mongoose.model('User', UserSchema);