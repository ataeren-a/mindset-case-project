const router = require('express').Router();
const controller = require('../controllers/userRoles');
const { authenticateAdmin, authenticate } = require('../middlewares/jwtMiddle');

router.post('/create', authenticateAdmin, controller.createRole);
router.get('/read/:id', authenticateAdmin, controller.readRole);
router.post('/read-all-roles', authenticateAdmin, controller.readAllRoles);
router.get('/find/:name', authenticate, controller.findRole);
router.patch('/update/:id', authenticateAdmin, controller.updateRole);
router.delete('/delete/:id', authenticateAdmin, controller.deleteRole);

module.exports = router;