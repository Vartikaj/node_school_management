const express = require('express');
const routeFiles = express();
const router = express.Router();

router.use('/admin', require('./admin-route'))
// routeFiles.use('/student', require('./routes/admin-route'))
// routeFiles.use('/school', require('./routes/admin-route'))
// routeFiles.use('/superadmin', require('./routes/admin-route'))

module.exports = router;