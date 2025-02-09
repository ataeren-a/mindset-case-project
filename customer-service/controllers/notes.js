const methods = require('../database/notes/methods');
const ResponseFactory = require('../helpers/responseFactory');

// by this point, I'm done with writing meaningful response messages :D This takes too long for a full-time employee to spend time on.
// if you wish to see more meaningful HTTP responses, please check the user management microservice.

const createNote = async (req, res) => {
    try {
        const result = await methods.createNote(req.body);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const readNotes = async (req, res) => {
    try {
        const result = await methods.readNotes(req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const updateNote = async (req, res) => {
    try {
        const result = await methods.updateNote(req.body, req.params);
        if (result) {
            res.status(200).json(new ResponseFactory(result, 'success', 200));
        } else {
            res.status(400).json(new ResponseFactory(result, 'failed', 400));
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteNote = async (req, res) => {
    try {
        const result = await methods.deleteNote(req.params);
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
    createNote,
    readNotes,
    updateNote,
    deleteNote
}