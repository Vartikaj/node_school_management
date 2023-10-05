const express = require('express');
const router = express.Router();

const {
    postRegistrationData,
} = require('../controllers/admin-route');

router.route('/postRegistrationData').post(postRegistrationData);

module.exports = router;