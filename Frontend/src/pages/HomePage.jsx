// filepath: /d:/Sabitha/NewsFuse/Frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const fetchNews = async (searchQuery = "") => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/news`, {
        params: { q: searchQuery }
      });
      setNews(response.data.articles);
    } catch (error) {
      setErrorMessage(" ");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to NewsFuse</h1>
        <div style={styles.links}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      </div>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <div style={styles.newsContainer}>
        {news.map((article, index) => (
          <div key={index} style={styles.card}>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={styles.image} />}
            <div style={styles.cardContent}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundImage: "url('https://st.depositphotos.com/1000423/3108/i/450/depositphotos_31084019-stock-photo-media-technologies.jpg')",
    backgroundSize: "cover",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "100px",
    color: "black",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  link: {
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
  },
  searchForm: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px 0 0 5px",
    border: "1px solid #ccc",
    width: "300px",
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "0 5px 5px 0",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  newsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  cardContent: {
    padding: "20px",
  },
};

export default HomePage;