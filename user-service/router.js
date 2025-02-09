const router = require('express').Router();

const userRoles = require('./routes/userRoles');
const users = require('./routes/users');

router.use('/user-roles', userRoles);
router.use('/users', users);

module.exports = router;