const express = require('express');
const ApiRateLimiter = require("../middleware/attempts.middleware");
const router = express.Router();


const {
    postRegistrationData,
    postLoginForm,
} = require('../controllers/admin-route');
const { Verify } = require('crypto');
const VerifyToken = require('../middleware/verifyToke.middleware');

router.route('/postRegistrationData').post(postRegistrationData);
router.route('/postLoginForm').post(ApiRateLimiter, postLoginForm);
// router.route('/profile').get(VerifyToken, profile);

module.exports = router;