const router = require('express').Router();

router.get('/user-roles', (req, res) => {
    try {
        res.status(200).json({ message: 'user roles' });
    } catch (error) {
        res.status(400).json({ message: 'cant get user roles'});
    }
});

module.exports = router;