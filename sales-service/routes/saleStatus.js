const router = require('express').Router();
const controller = require('../controllers/saleStatus');

router.post('/create', controller.createStatus);
router.get('/read/:sale_id', controller.readStatus);
router.patch('/update-note/:id', controller.updateStatusNote);
router.delete('/delete/:id', controller.deleteStatus);

module.exports = router;