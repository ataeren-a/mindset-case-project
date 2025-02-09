const router = require('express').Router();
const controller = require('../controllers/customers');

router.post('/create', controller.createCustomer);
router.get('/read/:id', controller.readCustomer);
router.post('/read-all-customers', controller.readAllCustomers);
router.patch('/update/:id', controller.updateCustomer);
router.delete('/delete/:id', controller.deleteCustomer);

module.exports = router;