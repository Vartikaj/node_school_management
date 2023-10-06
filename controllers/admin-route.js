const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const registrationForm = require('../models/registrationForm');

exports.postRegistrationData = asyncHandler(async (req, res, next) => {

    try {
        const regData = new registrationForm(req.body);
        // console.log(req);
        // regData.firstName = "Vrinda";
        const insertUserData = await regData.save();

        console.log(insertUserData)
        res.status(200).json({
            success: true,
            data : insertUserData,
        })
    } catch (error) {
        console.error('Error in postData:', error);
        next(error);
    }
});

