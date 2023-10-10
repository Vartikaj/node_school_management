const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const bcrypt = require('bcryptjs');

const registrationForm = require('../models/registrationForm');




exports.postRegistrationData = asyncHandler(async (req, res, next) => {
    try {
        // const regis = this;
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
        const username = req.body.username;
        const password = req.body.password;
        const user = await registrationForm.findOne({username: username}).exec();

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = user.generateAuthToken();
        console.log(token);
        await user.incrementLoginCount();

        // res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
        // res.json({ message: 'Login successful', status: 1 });
        res.status(200).json({
            success: true,
            data: 'data get',
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        });
    } 
})

