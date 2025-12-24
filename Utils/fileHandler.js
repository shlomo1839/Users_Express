import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = 'users.json';
const POSTS_FILE = 'posts.json';

// --- Users ---
export async function readUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// --- Posts ---
export async function readPosts() {
    try {
        const data = await fs.readFile(POSTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function writePosts(posts) {
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}
