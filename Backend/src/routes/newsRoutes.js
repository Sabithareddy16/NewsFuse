// filepath: /d:/Sabitha/NewsFuse/Backend/src/routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { q } = req.query;
  const query = q ? `&q=${q}` : '';
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?language=en${query}&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;