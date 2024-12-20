const express = require("express");
const { fetchNews } = require("../controllers/newsController");
const router = express.Router();

router.get("/", fetchNews);

module.exports = router;