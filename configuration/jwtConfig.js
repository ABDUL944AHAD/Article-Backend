// jwtConfig.js

module.exports = {
    secret: process.env.JWT_SECRET,       // use the key from your .env
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"  // optional expiration
};
