const router = require('express').Router();
const controller = require('../controllers/userRoles');
const { authenticateAdmin, authenticate } = require('../middlewares/jwtMiddle');

router.post('/create', controller.createRole);
router.get('/read/:id', controller.readRole);
router.post('/read-all-roles', controller.readAllRoles);
router.get('/find/:name', controller.findRole);
router.patch('/update/:id', controller.updateRole);
router.delete('/delete/:id', controller.deleteRole);

module.exports = router;