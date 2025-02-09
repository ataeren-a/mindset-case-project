const db = require('../database/users/methods');
const ResponseFactory = require('../helpers/responseFactory');

const createUser = async (req, res) => {
    try {
        const result = await db.createUser(req.body);
        
        if (result === 'email') {
            res.status(400).json(new ResponseFactory(result, 'Please check your email.', 400));
        } else if (result === 'password') {
            res.status(400).json(new ResponseFactory(result, 'Please check your password.', 400));
        } else if (result === 'username') {
            res.status(400).json(new ResponseFactory(result, 'Please check your username.', 400));
        } else if (!result) {
            res.status(400).json(new ResponseFactory(result, 'A user with the given username or email already exists.', 400));
        } else {
            res.status(201).json(new ResponseFactory(result, 'Created successfully.', 201));
        }
    } catch (error) {
        console.error(error);
    }
}

const login = async (req, res) => {
    try {
        const result = await db.login(req.body);
        if (result === 'provide_credentials') {
            res.status(400).json(new ResponseFactory(result, 'Please provide credentials.', 400));
        } else if (!result) {
            res.status(400).json(new ResponseFactory(result, 'Please recheck your credentials.', 400));
        } else {
            res.status(200).json(new ResponseFactory(result, 'Login successful.', 200));
        }
    } catch (error) {
        console.error(error);
    }
}

const readUser = async (req, res) => {
    try {
        const result = await db.readUser(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Read successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Could not be found.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readAllUsers = async (req, res) => {
    try {
        const result = await db.readAllUsers(req.body);

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

const findUser = async (req, res) => {
    try {
        const result = await db.findUser(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Read successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Could not be found.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await db.updateUser(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'Updated successfully.', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'Failed to update.', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await db.deleteUser(req.params);
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
    createUser,
    login,
    readUser,
    readAllUsers,
    findUser,
    updateUser,
    deleteUser,
};