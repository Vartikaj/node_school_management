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
            data: insertUserData,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        })
    }
});

exports.postLoginForm = asyncHandler(async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await registrationForm.findOne({ username: username }).exec();

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const token = user.generateAuthToken();
            await user.incrementLoginCount();
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
            

            user.lstguardianDetail = [];
            user.lstContactDetail = [];
            user.lstClass = [];
            user.transport = [];

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: user,
                token: token
            })
        }

    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        });
    }
})


exports.getProfile = asyncHandler(async (req, res, next) => {
    try {
        //console.log('call token1');

        const header = req.header.cookies;
        if(header==req.cookies.token){

        }
        console.log('Login successfuly')
        console.log(req.body);
        res.status(200).json({
            success: true,
            token : req.cookies.token,

        })
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        });
    }
});

