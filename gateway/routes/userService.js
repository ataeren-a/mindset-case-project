const { default: axios } = require('axios');
const { authenticate, authenticateAdmin } = require('../middlewares/authenticate');

const router = require('express').Router();

router.get(`/read-user/:id`, authenticate, async (req, res) => {
    try {
        axios
            .get(
                `${process.env.USER_SERVICE_URL}/user-service/users/read/${req.params.id}`,
                {headers: {Authorization: req.headers.authorization}}
            )
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(({ response }) => {
                    res.status(400).json(response.data);
                })
    } catch (error) {
        console.error(error);
    }
});

router.post(`/create-user`, authenticateAdmin, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.USER_SERVICE_URL}/user-service/users/create`,
                req.body,
                {headers: {Authorization: req.headers.authorization}}
            )
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(({ response }) => {
                    res.status(400).json(response.data);
                })
    } catch (error) {
        console.error(error);
    }
});

router.post(`/login`, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.USER_SERVICE_URL}/user-service/users/login`,
                req.body
            )
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(({ response }) => {
                    res.status(400).json(response.data);
                })
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;