const express = require('express');
const ApiRateLimiter = require("../middleware/attempts.middleware");
const router = express.Router();
const VerifyToken = require('../middleware/verifyToken.middleware');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const {
    postRegistrationData,
    postLoginForm,
    getProfile,
} = require('../controllers/admin-route');

router.route('/postRegistrationData').post(postRegistrationData);
router.route('/postLoginForm').post(ApiRateLimiter, postLoginForm);
router.route('/getProfile').get(VerifyToken, getProfile);

module.exports = router;