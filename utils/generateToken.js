// const jwt = require('jsonwebtoken')

// function generateToken(user) {
//     console.log("JWT_SECRET in generateToken:", process.env.JWT_SECRET);
//     const payload = {
//         id: user._id,
//         role: user.role
//     };
//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// }

// module.exports = generateToken


const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../configuration/jwtConfig"); // destructure

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secret, { expiresIn }); // use the secret string
}

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secret, { expiresIn: "7h" }); // refresh token duration
}

function verifyToken(token) {
    return jwt.verify(token, secret); // use secret string
}

module.exports = { generateToken, generateRefreshToken, verifyToken };
