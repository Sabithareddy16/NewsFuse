const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    content: String,
    author: String,
    source: {
        name: String,
        url: String,
    },
    url: { type: String, required: true },
    urlToImage: String,
    publishedAt: { type: Date, required: true },
    category: String,
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);