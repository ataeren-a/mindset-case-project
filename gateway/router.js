const router = require('express').Router();

const userService = require('./routes/userService');
const customerService = require('./routes/customerService');
const saleService = require('./routes/saleService');

router.use('/user-service', userService);
router.use('/customer-service', customerService);
router.use('/sale-service', saleService);

module.exports = router;