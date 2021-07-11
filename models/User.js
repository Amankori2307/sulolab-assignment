const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
const {USER_ROLE_ENUM} = require('../helper/enums')

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: USER_ROLE_ENUM,
        required: true,
    }
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next()
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err) return next(err);
        this.password = hashedPassword;
        next();        
    })
})

userSchema.methods.comparePassword =  function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err) return cb(err);
        if(!isMatch) return cb(null, false);
        return cb(null, this);
    })
}

exports.USER_ROLE_ENUM = USER_ROLE_ENUM
module.exports = mongoose.model('User', userSchema);