const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your actual NewsAPI key
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'your_news_api_key';

// Search News Route
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data.articles);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

// Category News Route
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        apiKey: NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data.articles);
  } catch (error) {
    console.error('Error fetching category news:', error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

// Fetch News Route
router.get('/news', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
      },
    });

    res.status(200).json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});

module.exports = router;