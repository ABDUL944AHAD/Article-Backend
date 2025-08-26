const articleModel = require('../model/mode');

// Get all articles
exports.getArticle = async (req, res) => {
    try {
        const articles = await articleModel.find({});
        res.status(200).send({
            message: "All articles fetched successfully",
            data: articles
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Create a new article
exports.saveArticle = async (req, res) => {
    try {
        const { articleName, authorName, category, articleContent , images } = req.body;

        const newArticle = await articleModel.create({
            articleName,
            authorName,
            category,
            articleContent,
            images
        });

        res.status(201).send({
            message: "Article created successfully",
            data: newArticle
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// ✅ Get single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get Related articles
exports.getRelatedArticles = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        const relatedArticles = await articleModel.find({
            category: article.category,
            _id: { $ne: article._id }, // exclude the current one
        })
            .limit(4)
            .sort({ createdAt: -1 });

        res.json(relatedArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { articleName, authorName, category, articleContent, images } = req.body;

        const updatedArticle = await articleModel.findByIdAndUpdate(
            id,
            { articleName, authorName, category, articleContent , images},
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).send({ message: "Article not found" });
        }

        res.status(200).send({
            message: "Article updated successfully",
            data: updatedArticle
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedArticle = await articleModel.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).send({ message: 'Article not found' });
        }

        res.status(200).send({
            message: 'Article deleted successfully',
            data: deletedArticle
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};












