import express from "express";
import { getPosts, createPosts, updatePosts,deletePost,likePost } from "../controllers/posts.js";

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPosts);
router.patch('/:id',updatePosts);
router.delete('/:id',deletePost);
router.patch('/:id/like',likePost);
export default router;