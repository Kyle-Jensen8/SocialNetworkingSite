const express = require('express');
const { getPosts, createPost, postsByUser, postById, isPoster, deletePost, updatePost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator');
const { userById } = require('../controllers/user');

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

// any route containint :userId, our app with first execute userById()
router.param("userId", userById);
// any route containint :postId, our app with first execute postById()
router.param("postId", postById);

module.exports = router;