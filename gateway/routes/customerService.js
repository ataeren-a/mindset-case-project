const { default: axios } = require('axios');
const { authenticate, authenticateAdmin } = require('../middlewares/authenticate');

const router = require('express').Router();

router.post(`/read-customers`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/customers/read-all-customers`,
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

router.post(`/create-customer`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/customers/create`,
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

router.patch(`/update-customer/:id`, authenticate, async (req, res) => {
    try {
        axios
            .patch(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/customers/update/${req.params.id}`,
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

router.get(`/read-customer-notes/:customer_id`, authenticate, async (req, res) => {
    try {
        axios
            .get(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/notes/read-notes/${req.params.customer_id}`,
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

router.post(`/create-customer-note`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/notes/create`,
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

router.patch(`/update-customer-note/:id`, authenticate, async (req, res) => {
    try {
        axios
            .patch(
                `${process.env.CUSTOMER_SERVICE_URL}/customer-service/notes/update/${req.params.id}`,
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

module.exports = router;