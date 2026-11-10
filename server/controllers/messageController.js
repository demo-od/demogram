import imagekit from "../configs/imagekit.js"
import { toFile } from "@imagekit/nodejs";
import fs from 'fs';
import Message from '../models/Message.js';
// Create an empty object to store the server-side event connections 
const connections = {};

// Controller function to handle SSE endpoint
export function sseController(req, res) {
  const { userId } = req.params;
  console.log('new client connected: ', userId);

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Add the response object to the connections object
  connections[userId] = res;

  // Send an initial event to the client 
  res.write('log: Connected to SSE stream\n\n');

  // Handle client disconnect
  req.on('close', () => {
    console.log('client disconnected');
    delete connections[userId];
  });
}

export async function sendMessage(req, res) {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;
    let media_url = '';
    let message_type = image ? 'image' : 'text';
    if (message_type === 'image') {
      const fileBuffer = await toFile(fs.readFileSync(image.path), image.originalname);

      const response = await imagekit.files.upload({
        file: fileBuffer,
        fileName: image.originalname,
        folder: "posts"
      })

      fs.unlinkSync(image.path);

      media_url = imagekit.helper.buildSrc({
        urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT'],
        src: response.filePath,
        transformation: [
          { quality: 'auto' },
          { format: 'webp' },
          { width: 1280 }
        ]
      })

    }

    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      media_url,
      message_type
    })

    res.json({ success: true, message });

    // Send the message to the recipient using SSE
    const messageWithUserData = await Message.findById(message._id).populate('from_user_id');

    if (connections[to_user_id]) {
      connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`);
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export async function getChatMessages(req, res) {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;
    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id: to_user_id },
        { from_user_id: to_user_id, to_user_id: userId }
      ]
    }).sort({ createdAt: 1 });
    // Mark messages as seen 
    await Message.updateMany({
      from_user_id: to_user_id, to_user_id: userId
    }, { seen: true });
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export async function getUserRecentMessages(req, res) {
  try {
    const { userId } = req.auth();
    const messages = await Message.find({ to_user_id: userId }).populate('from_user_id to_user_id').sort({ createdAt: -1 });
    res.json({ success: true, messages });
  }
  catch (error) {
    res.json({ success: false, message: error.message });
  }
}