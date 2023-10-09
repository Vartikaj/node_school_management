const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const registrationForm = require('../models/registrationForm');

exports.postRegistrationData = asyncHandler(async (req, res, next) => {
    try {
        const regData = new registrationForm(req.body);
        const insertUserData = await regData.save();
        res.status(200).json({
            success: true,
            data : insertUserData,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            data : error.message,
        })
    }
});

exports.postLoginForm = asyncHandler(async (req, res, next) => {
    try{
        const logData = new registrationForm(req.body);
        
    } catch (error) {

    } 
})

