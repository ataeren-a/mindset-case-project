const { default: axios } = require('axios');
const { authenticate, authenticateAdmin } = require('../middlewares/authenticate');

const router = require('express').Router();

router.post(`/read-sales`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.SALES_SERVICE_URL}/sales-service/sales/read-all-sales`,
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

router.post(`/create-sale`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.SALES_SERVICE_URL}/sales-service/sales/create`,
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

router.post(`/create-sale-status`, authenticate, async (req, res) => {
    try {
        axios
            .post(
                `${process.env.SALES_SERVICE_URL}/sales-service/sale-status/create`,
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

router.patch(`/update-sale-status/:id`, authenticate, async (req, res) => {
    try {
        axios
            .patch(
                `${process.env.SALES_SERVICE_URL}/sales-service/sale-status/update-note/${req.params.id}`,
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

router.get(`/read-sale-status/:sale_id`, authenticate, async (req, res) => {
    try {
        axios
            .get(
                `${process.env.SALES_SERVICE_URL}/sales-service/sale-status/read/${req.params.sale_id}`,
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