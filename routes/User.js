const express = require('express');
const router = express.Router();
const passportConf = require('../helper/passport')
const passport = require("passport")
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { TOKEN_ISSUER, SECRET_KEY } = require('../conf/dev');
const {genResponse, validateRequest} = require('../helper/utils')
const {registerValidation, loginValidations} = require('../helper/validators');
const { validationResult } = require('express-validator');


const signToken = (id) => {
    return JWT.sign({
        iss: TOKEN_ISSUER,
        sub: id
    }, SECRET_KEY, {expiresIn: '30d'})
}

router.post("/register", registerValidation, validateRequest, async (req, res) => {
  
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user) {return res
        .status(400)    
        .json(genResponse(true, false, "Email already registered!"))
    }
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if(err || !user) return res.json(genResponse(true, false, "Error occoured while saving user!"));
        return res.json(genResponse(false, true, "User created successfully!", {_id: user._id}));
    })
})

router.post("/login", loginValidations, validateRequest, passport.authenticate('local', {session: false}),  async (req, res) => {
    if(req.isAuthenticated){
        const token = signToken(req.user._id);
        return res.json(genResponse(false, true, "Logged In successfully", {auth_token: token}))
    }
})

module.exports = router;