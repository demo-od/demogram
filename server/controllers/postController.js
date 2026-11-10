import fs from 'fs';
import imagekit from "../configs/imagekit.js"
import Post from '../models/Post.js';
import User from '../models/User.js';
import { toFile } from "@imagekit/nodejs";
export async function addPost(req, res) {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const images = req.files

    let image_urls = [];
    if (images && images.length) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          const fileBuffer = await toFile(fs.readFileSync(image.path), image.originalname);

          const response = await imagekit.files.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "posts"
          })

          fs.unlinkSync(image.path);

          const url = imagekit.helper.buildSrc({
            urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT'],
            src: response.filePath,
            transformation: [
              { quality: 'auto' },
              { format: 'webp' },
              { width: 1280 }
            ]
          })

          return url
        })
      );


    }

    await Post.create({
      user: userId,
      content,
      image_urls,
      post_type
    })

    res.json({ success: true, message: "Post created successfully!" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export async function getFeedPosts(req, res) {
  try {
    const { userId } = req.auth()
    const user = await User.findById(userId);
    const userIds = [userId, ...user.connections, ...user.following];
    const posts = await Post.find({ user: { $in: userIds } }).populate('user').sort({ createdAt: -1 });

    res.json({ success: true, posts })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export async function likePost(req, res) {
  try {
    const { userId } = req.auth();
    const { postId } = req.body;
    const post = await Post.findById(postId);
    if (post.likes_count.includes(userId)) {
      post.likes_count = post.likes_count.filter(user => user !== userId)
      await post.save();
      res.json({ success: true, message: "Post unliked" })
    }
    else {
      post.likes_count.push(userId);
      await post.save();
      res.json({ success: true, message: 'Post liked' })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}