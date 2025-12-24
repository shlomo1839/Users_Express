import express from 'express';
import { readPosts, writePosts } from '../utils/fileHandler.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// get all posts:
router.get('/', async (req, res) => {
    const posts = await readPosts();
    res.json(posts);
});

// Create post:
router.post('/', authenticateUser, async (req, res) => {
    const { title, content } = req.body;
    // הזרקת הנתונים למשתנה מהבקשה
    const user = req.user; 

    const posts = await readPosts();
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    
    const newPost = {
        id: maxId + 1,
        title,
        content,
        authorId: user.id,
        authorUsername: user.username
    };

    posts.push(newPost);
    await writePosts(posts);

    res.status(201).json(newPost);
});

// Update Post:
router.put('/:id', authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const user = req.user;

    const posts = await readPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    // change error
    if (posts[postIndex].authorId !== user.id) {
        return res.status(403).json({ message: "Forbidden: You can only modify your own posts" });
    }

    if (title) posts[postIndex].title = title;
    if (content) posts[postIndex].content = content;

    await writePosts(posts);
    res.json(posts[postIndex]);
});

// Delete Post:
router.delete('/:id', authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id);
    const user = req.user;

    const posts = await readPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== user.id) {
        return res.status(403).json({ message: "Forbidden: You can only delete your own posts" });
    }

    const filteredPosts = posts.filter(p => p.id !== postId);
    await writePosts(filteredPosts);

    res.json({ message: "Post deleted successfully" });
});


router.get('/my', authenticateUser, async (req, res) => {
    const user = req.user;
    const posts = await readPosts();
    const myPosts = posts.filter(p => p.authorId === user.id);
    res.json(myPosts);
});

export default router;
