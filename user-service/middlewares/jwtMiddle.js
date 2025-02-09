const { verify } = require('jsonwebtoken');
const { handleInternalError, handleError} = require('../helpers/error');

function authenticate(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return next(handleError(res, 401, 'Please login.'));
    }

    const header = req.headers.authorization.split(" ");
    if (header[0] !== 'Bearer') {
        return next(handleError(res, 401, 'Unexpected header.'));
    }

    const token = header[1];

    verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return next(handleError(res, 401, 'Invalid credentials.'));
        }

        try {
            const readUser = require('../database/users/methods').readUser;

            const user = await readUser({id: decoded.data.id});

            if (!user) {
                next(handleError(res, 401, 'Invalid credentials.'));
            }

            if (user) {
                res.locals.token_info = user;
            }
            next();
        } catch (error) {
            next(handleInternalError(res));
        }
    });
}

function authenticateAdmin(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return next(handleError(res, 401, 'Please login.'));
    }

    const header = req.headers.authorization.split(" ");
    if (header[0] !== 'Bearer') {
        return next(handleError(res, 401, 'Unexpected header.'));
    }

    const token = header[1];

    verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return next(handleError(res, 401, 'Invalid credentials.'));
        }

        try {
            const readUser = require('../database/users/methods').readUser;

            const user = await readUser({id: decoded.data.id});

            if (!user) {
                next(handleError(res, 401, 'Invalid credentials.'));
            }

            if (user.role_id != 1) {
                next(handleError(res, 403, 'Not allowed.'));
            }

            if (user) {
                res.locals.token_info = user;
            }
            next();
        } catch (error) {
            next(handleInternalError(res));
        }
    });
}

module.exports = {
    authenticate,
    authenticateAdmin
};