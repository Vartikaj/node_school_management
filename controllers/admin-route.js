const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const bcrypt = require('bcryptjs');
const registrationForm = require('../models/registrationForm');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const SESSION_DURATION_SECONDS = 60; // Set session duration to 60 seconds (1 minute)
var _ = require('lodash');

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
        const user = await registrationForm.findOne({ username: username });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const token = user.generateAuthToken();
            console.log(token);
            await user.incrementLoginCount();
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
            
            user.lstguardianDetail = [];
            user.lstContactDetail = [];
            user.lstClass = [];
            user.transport = [];

            console.log("user id data" + user._id);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: user,
                token: token,
                id : user._id,
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
        const idData = req.query.id;
        const user = await registrationForm.findOne({ _id : idData });
        
        res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        });
    }
});

exports.getEditProfile = asyncHandler(async (req, res, next) => {
    try {
        console.log("before calling findone")
        const result = registrationForm.findById(req.query.id)        

        console.log("calle findone")
        if(result) {
            result.then(data=>{
                _.assign(data, req.body);

              const savedData =   data.save();
              savedData.then((finalRes)=>{
                return res.status(200).json(finalRes)
              })

            })

        };


        // const userUpdate = await registrationForm.updateOne({ _id : idUpdate }, req.body);
        // // const insertUserData =  userUpdate.save();
        // if(userUpdate.modifiedCount === 1){
        //     console.log("(1) data modified successfully");
        //     res.status(200).json({
        //       success: true,
        //     //   data: insertUserData,
        //     data: 'data updated successfuly',
        //     });
        // }else {
        // console.log("Their is some error");
        // }
    } catch (error) {
        res.status(200).json({
            success: false,
            data: error.message,
        })
    }
});

