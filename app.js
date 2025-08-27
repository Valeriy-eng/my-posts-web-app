const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let customPosts = []; // In-memory post storage

app.get('/api/posts', async (req, res) => {
  try {
    // Combine custom posts with some from JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts = [...customPosts, ...response.data];
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.post('/api/posts', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newPost = {
    id: Date.now(),
    title,
  };

  customPosts.unshift(newPost); // Add new post to the beginning
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
