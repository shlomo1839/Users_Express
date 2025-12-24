import express from 'express';
import { readUsers, writeUsers } from '../utils/fileHandler.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const users = await readUsers();
    
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const newUser = { id: maxId + 1, username, email, password };
    
    users.push(newUser);
    await writeUsers(users);

    // ???
    const { password: _, ...userResponse } = newUser;
    res.status(201).json(userResponse);
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // ???
    const { password: _, ...userResponse } = user;
    res.json({ message: "Login successful", user: userResponse });
});

export default router;
