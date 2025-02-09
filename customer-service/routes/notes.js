const router = require('express').Router();
const controller = require('../controllers/notes');

router.post('/create', controller.createNote);
router.get('/read-notes/:customer_id', controller.readNotes);
router.patch('/update/:id', controller.updateNote);
router.delete('/delete/:id', controller.deleteNote);

module.exports = router;