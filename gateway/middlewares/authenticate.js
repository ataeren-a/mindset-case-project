const { default: axios } = require("axios");
const { handleError } = require("../error");

async function authenticate(req, res, next) {
    axios
        .get(
                `${process.env.USER_SERVICE_URL}/user-service/auth/authenticate`, 
                {headers: {Authorization: req.headers.authorization}}
            )
            .then(_ => {
                next();
            })
            .catch(_ => {
                handleError(res, 401, 'Not allowed.');
            })
}

async function authenticateAdmin(req, res, next) {
    axios
        .get(
                `${process.env.USER_SERVICE_URL}/user-service/auth/authenticate-admin`
                , {headers: {Authorization: req.headers.authorization}}
            )
            .then(_ => {
                next();
            })
            .catch(_ => {
                handleError(res, 401, 'Not allowed.');
            })
}

module.exports = {
    authenticate,
    authenticateAdmin,
};