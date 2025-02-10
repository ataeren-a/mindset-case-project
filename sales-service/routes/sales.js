const router = require('express').Router();
const controller = require('../controllers/sales');

router.post('/create', controller.createSale);
router.get('/read/:id', controller.readSale);
router.post('/read-all-sales', controller.readAllSales);
router.patch('/update/:id', controller.updateSale);
router.delete('/delete/:id', controller.deleteSale);

module.exports = router;