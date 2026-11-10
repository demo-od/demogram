import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../configs/multer.js';
import { getStories, adduserStory } from '../controllers/storyController.js';
const storyRouter = express.Router();

storyRouter.get('/get', protect, getStories);
storyRouter.post('/create', upload.single('media'), protect, adduserStory);

export default storyRouter;
