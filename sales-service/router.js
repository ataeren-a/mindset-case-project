const router = require('express').Router();

const sales = require('./routes/sales');

router.use('/sales', sales);

module.exports = router;