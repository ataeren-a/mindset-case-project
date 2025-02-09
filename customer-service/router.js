const router = require('express').Router();

const customers = require('./routes/customers');

router.use('/customers', customers);

module.exports = router;