const router = require('express').Router();
const controller = require('../controllers/users');
const { authenticate, authenticateAdmin } = require('../middlewares/jwtMiddle');

router.post('/create'/* , authenticateAdmin */, controller.createUser);
router.post('/login', controller.login);
router.get('/read/:id', authenticate, controller.readUser);
router.post('/read-all-users', authenticateAdmin, controller.readAllUsers);
router.patch('/update/:id', authenticateAdmin, controller.updateUser);
router.delete('/delete/:id', authenticateAdmin, controller.deleteUser);

module.exports = router;