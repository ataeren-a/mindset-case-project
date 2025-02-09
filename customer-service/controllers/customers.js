const methods = require('../database/customers/methods');
const ResponseFactory = require('../helpers/responseFactory');

// by this point, I'm done with writing meaningful response messages :D This takes too long for a full-time employee to spend time on.
// if you wish to see more meaningful HTTP responses, please check the user management microservice.

const createCustomer = async (req, res) => {
    try {
        const result = await methods.createCustomer(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readCustomer = async (req, res) => {
    try {
        const result = await methods.readCustomer(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readAllCustomers = async (req, res) => {
    try {
        const result = await methods.readAllCustomers(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateCustomer = async (req, res) => {
    try {
        const result = await methods.updateCustomer(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const result = await methods.deleteCustomer(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createCustomer,
    readCustomer,
    readAllCustomers,
    updateCustomer,
    deleteCustomer
}