import express from 'express';
import * as blogController from '../Controllers/Blog.controller.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';
const router = express.Router();

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);

// Protected routes (admin only)
router.post('/', isAuthenticated, blogController.createBlog);
router.put('/:id', isAuthenticated, blogController.updateBlog);
router.delete('/:id', isAuthenticated, blogController.deleteBlog);

export default router;