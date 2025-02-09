const router = require('express').Router();

const customers = require('./routes/customers');
const notes = require('./routes/notes');

router.use('/customers', customers);
router.use('/notes', notes);

module.exports = router;