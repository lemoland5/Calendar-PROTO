const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const crypto = require(`./crypto.js`)

    //SCHEMA DECLARATION
const daySchema = new mongoose.Schema({
    dat: {type: Date},
    tx: {type: Number},
    ty: {type: Number},
    reaction: {type: String},
    color: {type: String},
    week: {type: Number},
    user: {type: String}    // user's email
});

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique : true},
    password: {type: String, required: true},
    avatar: {type: String},
    lastDay: {type: Number}
});

    //MODEL COMPLIATION
const Day = mongoose.model('Day', daySchema);
const User = mongoose.model('User', userSchema);

    //INCREDIBLY NECESSARY OUTSIDE FUNCTION
const dbSetup = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/cal');
}

const add = obj => {
    switch(obj.type){
        case 'day':
            addDay(obj);
            break;
        case 'user':
            addUser(obj);
            break;
    }
}

const addDay = obj => {
    new Day({
        dat: obj.date,
        tx: obj.tx,
        ty: obj.ty,
        reaction: obj.reaction,
        color: obj.color,
        week: obj.week,
        user: obj.user
    }).save();
}

const addUser = obj => {
    new User({
        email: obj.email,
        password: crypto.hash(obj.password)
    }).save();
}


module.exports = {
    Day,
    User,
    add,
    dbSetup
}