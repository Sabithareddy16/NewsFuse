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

// Fetch news by category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: category,
        apiKey: apiKey,
        country: 'us', // You can change the country code as needed
      },
    });

    res.json(response.data.articles);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;