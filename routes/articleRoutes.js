//without image

// const express = require('express');
// const router = express.Router();
// const articleController = require('../controller/articleController');

// router.get('/get', articleController.getArticle);
// router.post('/save', articleController.saveArticle);
// router.put('/update/:id', articleController.updateArticle);
// router.delete('/delete/:id', articleController.deleteArticle);

// module.exports = router;


// with image from cloudinary
const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const authMiddleware = require('../middleware/authMiddleware');


// Public routes
router.get('/get', articleController.getAllArticles);            // all articles
router.get('/related/:id', articleController.getRelatedArticles); // related
router.get('/get/:id', articleController.getArticleById);            // single article by ID (dynamic, last)

// Protected routes
router.get('/my', authMiddleware, articleController.getMyArticles); // user's own articles
router.post('/save', authMiddleware, articleController.saveArticle);
router.put('/update/:id', authMiddleware, articleController.updateArticle);
router.delete('/delete/:id', authMiddleware, articleController.deleteArticle); 

module.exports = router;
