const ResponseFactory = require('../helpers/responseFactory');
const methods = require('../database/saleStatus/methods');

const createStatus = async (req, res) => {
    try {
        const result = await methods.createStatus(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readStatus = async (req, res) => {
    try {
        const result = await methods.readStatus(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateStatusNote = async (req, res) => {
    try {
        const result = await methods.updateStatusNote(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'successful', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteStatus = async (req, res) => {
    try {
        const result = await methods.deleteStatus(req.params);
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
    createStatus,
    readStatus,
    updateStatusNote,
    deleteStatus,
}