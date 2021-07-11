const {check, validationResult} = require("express-validator")
const {USER_ROLE_ENUM} = require("../helper/enums")
exports.registerValidation = [
    check("email")
        .notEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Invalid email format!")
        .trim().escape(),
    check("password")
        .notEmpty().withMessage("Password is required!") 
        .isString().withMessage("Password should be a string!") 
        .trim().escape(),
    check("role")
        .notEmpty().withMessage("Role is required!")
        .isIn(USER_ROLE_ENUM).withMessage("Invalid Role!")
        .trim().escape()
    ]


exports.loginValidations = [
    check("email")
        .notEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Invalid email format!")
        .trim().escape(),
    check("password")
        .notEmpty().withMessage("Password is required!") 
        .isString().withMessage("Password should be a string!") 
        .trim().escape(),   
]