const express = require('express');
const ApiRateLimiter = require("../middleware/attempts.middleware");
const router = express.Router();
const VerifyToken = require('../middleware/verifyToken.middleware');
const CacheAuth = require('../middleware/myCache.middleware');


const {
    postRegistrationData,
    postLoginForm,
    getProfile,
    getEditProfile,
} = require('../controllers/admin-route');

router.route('/postRegistrationData').post(postRegistrationData);
router.route('/postLoginForm').post(ApiRateLimiter, postLoginForm);
router.route('/getProfile').get(VerifyToken, getProfile);
router.route('/getEditProfile').get(VerifyToken, getEditProfile);

module.exports = router;