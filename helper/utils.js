const { validationResult } = require("express-validator")

const genResponse = (error, success, message="", data={}, count=null) => {
    return {
        error: error,
        success: success,
        message:  message,
        data: data,
        count: count,
    }
}
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(genResponse(true, false, "Validation Error Occured", errors));
    next();

}


module.exports = {
    genResponse,
    validateRequest,
}