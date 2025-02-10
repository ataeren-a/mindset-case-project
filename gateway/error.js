const ResponseFactory = require("./responseFactory");

function handleInternalError(res) {
    res.status(500).json(new ResponseFactory('internal_error', 'Internal server error.', 500));
    return new Error('Internal server error');
}

function handleError(res, code, message) {
    res.status(code).json(new ResponseFactory(null, message, code));
    return new Error(message);
}

module.exports = {
    handleInternalError,
    handleError
};