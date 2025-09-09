// const articleModel = require('../models/Article');

// // Get all articles
// exports.getArticle = async (req, res) => {
//     try {
//         const articles = await articleModel.find({});
//         res.status(200).send({
//             message: "All articles fetched successfully",
//             data: articles
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

// // Create a new article
// exports.saveArticle = async (req, res) => {
//     try {
//         const { articleName, authorName, category, articleContent , images } = req.body;

//         const newArticle = await articleModel.create({
//             articleName,
//             authorName,
//             category,
//             articleContent,
//             images
//         });

//         res.status(201).send({
//             message: "Article created successfully",
//             data: newArticle
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

// // ✅ Get single article by ID
// exports.getArticleById = async (req, res) => {
//     try {
//         const article = await articleModel.findById(req.params.id);
//         if (!article) {
//             return res.status(404).json({ message: 'Article not found' });
//         }
//         res.json(article);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// //Get Related articles
// exports.getRelatedArticles = async (req, res) => {
//     try {
//         const article = await articleModel.findById(req.params.id);

//         if (!article) {
//             return res.status(404).json({ message: "Article not found" });
//         }

//         const relatedArticles = await articleModel.find({
//             category: article.category,
//             _id: { $ne: article._id }, // exclude the current one
//         })
//             .limit(4)
//             .sort({ createdAt: -1 });

//         res.json(relatedArticles);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update an article
// exports.updateArticle = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { articleName, authorName, category, articleContent, images } = req.body;

//         const updatedArticle = await articleModel.findByIdAndUpdate(
//             id,
//             { articleName, authorName, category, articleContent , images},
//             { new: true, runValidators: true }
//         );

//         if (!updatedArticle) {
//             return res.status(404).send({ message: "Article not found" });
//         }

//         res.status(200).send({
//             message: "Article updated successfully",
//             data: updatedArticle
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };

// // Delete an article
// exports.deleteArticle = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedArticle = await articleModel.findByIdAndDelete(id);

//         if (!deletedArticle) {
//             return res.status(404).send({ message: 'Article not found' });
//         }

//         res.status(200).send({
//             message: 'Article deleted successfully',
//             data: deletedArticle
//         });
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };


const articleModel = require('../models/Article');

// Get all articles (public)
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: "All articles fetched successfully",
            data: articles
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get logged-in user's articles
exports.getMyArticles = async (req, res) => {
    try {
        const articles = await articleModel
            .find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Your articles fetched successfully",
            data: articles
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Create a new article
exports.saveArticle = async (req, res) => {
    try {
        const { articleName, category, articleContent, images } = req.body;

        if (!articleName || !category || !articleContent) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newArticle = await articleModel.create({
            articleName,
            authorName: req.user.name,    // ✅ dynamic from logged-in user
            category,
            articleContent,
            images: images || [],
            createdBy: req.user._id       // ✅ comes from token
        });

        res.status(201).json({
            message: "Article created successfully",
            data: newArticle
        });
    } catch (err) {
        console.error("Create article error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get single article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get related articles (by category)
exports.getRelatedArticles = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Article not found" });

        const relatedArticles = await articleModel.find({
            category: article.category,
            _id: { $ne: article._id }
        })
            .limit(4)
            .sort({ createdAt: -1 });

        res.status(200).json(relatedArticles);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update article
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await articleModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Allow if user is admin OR the author of the article
        if (req.user.role !== "admin" && article.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only edit your own articles" });
        }

        // Update fields
        const updatedArticle = await articleModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Article updated successfully",
            data: updatedArticle
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete article
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await articleModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Allow if user is admin OR the author of the article
        if (req.user.role !== "admin" && article.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own articles" });
        }

        // ✅ Delete using Model method
        await articleModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Article deleted successfully",
            data: article
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};








