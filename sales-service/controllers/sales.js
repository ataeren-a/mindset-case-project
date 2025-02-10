const ResponseFactory = require('../helpers/responseFactory');
const methods = require('../database/sales/methods');

const createSale = async (req, res) => {
    try {
        const result = await methods.createSale(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readSale = async (req, res) => {
    try {
        const result = await methods.readSale(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readAllSales = async (req, res) => {
    try {
        const result = await methods.readAllSales(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateSale = async (req, res) => {
    try {
        const result = await methods.updateSale(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteSale = async (req, res) => {
    try {
        const result = await methods.deleteSale(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createSale,
    readSale,
    readAllSales,
    updateSale,
    deleteSale,
}