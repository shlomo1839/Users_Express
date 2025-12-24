import express from 'express';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// רישום הראוטים
app.use('/', authRoutes);      // /register, /login
app.use('/posts', postRoutes); // /posts, /posts/:id
app.use('/users', userRoutes); 

// Root Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Simple Auth API Modularized" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
