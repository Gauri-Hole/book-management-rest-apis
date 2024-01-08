const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/publish', authMiddleware.verifyToken, bookController.publishBook);
router.get('/search', authMiddleware.verifyToken, bookController.searchBooks);
router.put('/unpublish/:bookId', authMiddleware.verifyToken, bookController.unpublishBook);
router.get('/user', authMiddleware.verifyToken, bookController.getUserBooks);
router.get('/published', authMiddleware.verifyToken, bookController.getAllPublishedBooks);

module.exports = router;
