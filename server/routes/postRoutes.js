import express from 'express';
import { upload } from '../configs/multer.js'
const postRouter = express.Router();
import { protect } from '../middleware/auth.js'
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';

postRouter.post('/add', upload.array('images', 4), protect, addPost)
postRouter.get('/feed', protect, getFeedPosts);
postRouter.get('/like', protect, likePost);

export default postRouter;
