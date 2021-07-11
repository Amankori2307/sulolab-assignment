const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { SECRET_KEY } = require('../conf/dev');
const User = require('../models/User')

const tokenExtractor = (req) => {
    var token = null;
    if(req.cookies && req.cookies['access_token']){
        token = req.cookies['access_token']
    }
    return token
}


// For Authorization
passport.use(new JWTStrategy({
    jwtFromRequest: tokenExtractor,
    secretOrKey: SECRET_KEY
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err) done(err);
        if(!user) done(null, false);
        done(null, user);
    })
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