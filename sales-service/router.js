const router = require('express').Router();

const sales = require('./routes/sales');
const saleStatus = require('./routes/saleStatus');

router.use('/sales', sales);
router.use('/sale-status', saleStatus);

module.exports = router;