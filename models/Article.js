
const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
    articleName: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    articleContent: {
        type: String, // ✅ plain text (from stripHtmlTags)
        required: true,
    },
    images: {
        type: [String], // ✅ store multiple image URLs
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // ✅ Reference to User
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true }); // adds createdAt, updatedAt automatically
module.exports = mongoose.model("Article", articleSchema)
