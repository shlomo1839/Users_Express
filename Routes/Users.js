import express from 'express';
import { readUsers, writeUsers, readPosts, writePosts } from '../utils/fileHandler.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Get all users:
router.get('/', async (req, res) => {
    const users = await readUsers();
    const safeUsers = users.map(({ id, username, email }) => ({ id, username, email }));
    res.json(safeUsers);
});

// Update profilee:
router.put('/profile', authenticateUser, async (req, res) => {
    const { email, newPassword } = req.body;
    const user = req.user;

    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (email) users[userIndex].email = email;
    if (newPassword) users[userIndex].password = newPassword;

    await writeUsers(users);

    const { password: _, ...userResponse } = users[userIndex];
    res.json(userResponse);
});

// Delete account:
router.delete('/account', authenticateUser, async (req, res) => {
    const user = req.user;

    // מחיקת המשתמש
    const users = await readUsers();
    const filteredUsers = users.filter(u => u.id !== user.id);
    await writeUsers(filteredUsers);

    // מחיקת הפוסטים של המשתמש
    const posts = await readPosts();
    const filteredPosts = posts.filter(p => p.authorId !== user.id);
    await writePosts(filteredPosts);

    res.json({ message: "Account and all posts deleted successfully" });
});

export default router;
