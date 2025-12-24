import express from 'express';
import { writeFile } from 'node:fs';
import fs from 'node:fs/promice';


const app = express();
const PORT = 3000;

app.use(express.json());

async function readUsers() {
    try {
        const db = await fs.readfile("users.json", "utf8");
        return JSON.parse(db);
    } catch (error) {
        console.error(error.message)
    }
};


async function writeUsers(users, data) {
    try {
        await fs.writeFile(users, JSON.stringify(data, null, 2), 'utf8')
        return "file written succssfully"
    } catch {
        return []
    }
}

console.log(writeFile("dddgggdgdgdg"));


async function readPosts() {
    
}

async function writePosts(posts){

}


async function write(filePath, data, createIfNotExists = true) {

}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
