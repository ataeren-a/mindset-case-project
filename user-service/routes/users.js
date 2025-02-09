const router = require('express').Router();
const controller = require('../controllers/users');

router.post('/create', controller.createUser);
router.post('/login', controller.login);
router.get('/read/:id', controller.readUser);
router.post('/read-all-users', controller.readAllUsers);
router.patch('/update/:id', controller.updateUser);
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;