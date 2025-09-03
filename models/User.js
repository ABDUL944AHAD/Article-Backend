
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: [ "admin", "author"], default: "author" },
    lastLogin: { type: Date, default: Date.now }


})
module.exports = mongoose.model('User', userSchema);