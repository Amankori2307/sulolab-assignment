const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { SECRET_KEY } = require('../conf/dev');
const User = require('../models/User')

const tokenExtractor = (req) => {
    var token = null;
    if(req.header('x-auth-header')){
        token = req.header('x-auth-header')
    }
    return token
}


// For Authorization
passport.use(new JWTStrategy({
    jwtFromRequest: tokenExtractor,
    secretOrKey: SECRET_KEY
}, async (payload, done) => {
    var user = await User.findById({_id: payload.sub}).select("-password")
    if(!user) done(null, false);
    done(null, user);
}))


// For Authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({email}, (err,user) => {
        if(err) return done(err);
        if(!user) return done(false, null);
        user.comparePassword(password, done)
    })
}))