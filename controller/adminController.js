const User = require('../models/User');
const Article = require('../models/Article');

// Admin Dashboard Stats

const getDashboardStats = async (req, res) => {
    try {
        const totalArticles = await Article.countDocuments();
        const newArticles = await Article.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }); // last 7 days
        const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });

        res.json({ totalArticles, newArticles, activeUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// User Management
// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await User.find({ role: 'author' }).select('-password').sort({ lastLogin: -1 });
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update author role (promote/demote)
const updateAuthorRole = async (req, res) => {
    try {
        const { role } = req.body;
        const author = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        res.json(author);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete author
const deleteAuthor = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Author deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Article Management

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 }); // latest first
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Article deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Recent Activities

const getRecentActivities = async (req, res) => {
    try {
        const recentUsers = await User.find().sort({ lastLogin: -1 }).limit(10).select('name email lastLogin');
        const recentArticles = await Article.find().sort({ createdAt: -1 }).limit(10).select('title author createdAt');
        res.json({ recentUsers, recentArticles });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getDashboardStats,
    getAllAuthors,      
    updateAuthorRole,   
    deleteAuthor,       
    getAllArticles,
    deleteArticle,
    updateArticle,
    getRecentActivities
};
