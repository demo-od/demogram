import express from 'express';
import {protect} from '../middleware/auth.js';
import {upload} from '../configs/multer.js';

const messageRouter = express.Router();
import {getChatMessages, sendMessage, sseController} from '../controllers/messageController.js';

messageRouter.get('/:userId', sseController);
messageRouter.post('/send', upload.single('image'), protect, sendMessage);
messageRouter.post('/get', protect, getChatMessages);

export default messageRouter;