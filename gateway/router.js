const router = require('express').Router();

const userRoles = require('./routes/userRoles');

router.use('/user-roles', userRoles);

module.exports = router;