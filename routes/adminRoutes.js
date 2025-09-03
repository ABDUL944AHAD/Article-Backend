const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controller/adminController');

// Dashboard Stats

router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.getDashboardStats
);

// Author Management
router.get(
    '/authors',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.getAllAuthors
);

router.put(
    '/authors/:id/role',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.updateAuthorRole
);

router.delete(
    '/authors/:id',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.deleteAuthor
);


// Article Management

router.get(
    '/articles',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.getAllArticles
);

router.put(
    '/articles/:id',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.updateArticle
);

router.delete(
    '/articles/:id',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.deleteArticle
);

// Recent Activities

router.get(
    '/activities',
    authMiddleware,
    roleMiddleware('admin'),
    adminController.getRecentActivities
);

module.exports = router;
