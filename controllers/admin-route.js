const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const registrationForm = require('../models/student-Details');
console.log("qqq1")
exports.postRegistrationData = asyncHandler(async (req, res, next) => {

    try {
       
        const regData = new registrationForm(req.body);
        const insertUserData = await userInfo.save();
        res.status(200).json({
            success: true,
            data:insertUserData,
        })
    } catch (error) {
        console.error('Error in postData:', error);
        next(error);
    }
});

