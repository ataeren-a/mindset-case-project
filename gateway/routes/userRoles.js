const router = require('express').Router();

/**
 * @swagger
 *  get:
 *      summary: Test
 *      responses:
 *          200:
 *              description: Test
 */
router.get('/user-roles', (req, res) => {
    try {
        res.status(200).json({ message: 'user roles' });
    } catch (error) {
        res.status(400).json({ message: 'cant get user roles'});
    }
});

module.exports = router;