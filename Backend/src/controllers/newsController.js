const axios = require("axios");
const Article = require("../models/Article");

exports.fetchNews = async (req, res) => {
    try {
        const { category, query } = req.query;
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                // category,
                q: "apple",
            },
        });

        const articles = response.data.articles;

        // Optionally cache articles in the database
        // articles.forEach(async (article) => {
        //     await Article.updateOne(
        //         { url: article.url },
        //         { $set: article },
        //         { upsert: true }
        //     );
        // });

        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};