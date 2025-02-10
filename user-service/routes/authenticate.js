const ResponseFactory = require('../helpers/responseFactory');
const { authenticate, authenticateAdmin } = require('../middlewares/jwtMiddle');

const router = require('express').Router();

router.get('/authenticate', authenticate, async (req, res) => {
    try {
        res.status(200).json(new ResponseFactory(null, 'success', 200));
    } catch (error) {
        console.error(error);
    }
});

router.get('/authenticate-admin', authenticateAdmin, async (req, res) => {
    try {
        res.status(200).json(new ResponseFactory(null, 'success', 200));
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;