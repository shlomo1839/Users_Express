import { readUsers } from '../utils/fileHandler.js';

export async function authenticateUser(req, res, next) {
    // Authentication by sending a username and password in the request body
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: Invalid username or password" });
    }

    // Save the user information on the req object so that it will be available on the next route
    req.user = user;
    next();
}
