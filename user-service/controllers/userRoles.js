const db = require('../database/userRoles/methods');
const ResponseFactory = require('../helpers/responseFactory');

const createRole = async (req, res) => {
    try {
        const result = await db.createRole(req.body);
        if (result) {
            res.status(201).json(new ResponseFactory(result, 'Created successfully.', 201));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Failed to create.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readRole = async (req, res) => {
    try {
        const result = await db.readRole(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Read successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Could not be found.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readAllRoles = async (req, res) => {
    try {
        const result = await db.readAllRoles(req.body);

        if (result === 'invalid_body') {
            res.status(400).json(new ResponseFactory(result, 'Invalid argument in body.', 400));
        } else if (!result) {
            res.status(400).json(new ResponseFactory(result, 'Failed to read user roles.', 400));
        } else {
            res.status(200).json(new ResponseFactory(result, 'Read succesfully.', 200));
        }
    } catch (error) {
        console.error(error);
    }
}

const findRole = async (req, res) => {
    try {
        const result = await db.findRole(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Read successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Could not be found.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateRole = async (req, res) => {
    try {
        const result = await db.updateRole(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Updated successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Failed to update.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteRole = async (req, res) => {
    try {
        const result = await db.deleteRole(req.params);
        if (result) {
            res.status(201).json(new ResponseFactory(result, 'Deleted successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Failed to delete.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createRole,
    readRole,
    readAllRoles,
    findRole,
    updateRole,
    deleteRole,
};