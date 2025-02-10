const router = require('express').Router();

const userRoles = require('./routes/userRoles');
const users = require('./routes/users');
const auth = require('./routes/authenticate');

router.use('/user-roles', userRoles);
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;