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

router.get('/get', articleController.getArticle);
router.get('/:id', articleController.getArticleById);
router.get("/related/:id", articleController.getRelatedArticles);
router.post('/save',  articleController.saveArticle);
router.put('/update/:id', articleController.updateArticle);
router.delete('/delete/:id', articleController.deleteArticle);

module.exports = router;


