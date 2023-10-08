const express = require('express');

const {
    createBlog,
    getUserBlogs,
    likeblog,
    deleteBlog,
    blogsbycategory,
    feed,
    getBlog
} = require('../controllers/blogController');
const { model } = require('mongoose');

const router = express.Router();

router.post('/createblog', createBlog);
router.get('/users/:username',getUserBlogs);
router.post('/likeblog', likeblog)
router.post('/deleteblog',deleteBlog)
router.get('/blogsbycategory/:category',blogsbycategory)
router.get('/feed/:userId',feed)
router.get('/getblog/:blogId',getBlog)


module.exports = router;