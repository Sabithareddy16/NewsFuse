import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/news`, {
        params: { q: query },
      });
      setArticles(response.data.articles);
      setLoading(false);
    } catch (err) {
      setError('Error fetching news');
      setLoading(false);
    }
  };

  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.logo}>NewsFuse</h1>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><Link to="/news/sports" style={styles.navLink}>Sports</Link></li>
            <li style={styles.navItem}><Link to="/news/business" style={styles.navLink}>Business</Link></li>
            <li style={styles.navItem}><Link to="/news/entertainment" style={styles.navLink}>Entertainment</Link></li>
            <li style={styles.navItem}><Link to="/news/technology" style={styles.navLink}>Technology</Link></li>
            <li style={styles.navItem}><Link to="/news/politics" style={styles.navLink}>Politics</Link></li>
            <li style={styles.navItem}><Link to="/news/health" style={styles.navLink}>Health</Link></li>
            {/* <li style={styles.navItem}><Link to="/news/travel" style={styles.navLink}>Travel</Link></li>
            <li style={styles.navItem}><Link to="/news/world" style={styles.navLink}>World</Link></li>
            <li style={styles.navItem}><Link to="/news/weather" style={styles.navLink}>Weather</Link></li> */}
          </ul>
        </nav>
      </header>
      <main style={styles.container}>
        <h1 style={{ fontSize: '50px' }}>Welcome to NewsFuse</h1>
        <p style={{ fontSize: '25px' }}>Explore personalized content and bookmark your favorite news!</p>
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
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.newsContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            articles.map((article, index) => (
              <div key={index} style={styles.card}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={styles.image} />}
                <div style={styles.cardContent}>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                  <p><strong>Source:</strong> {article.source.name}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundImage: "url('https://st.depositphotos.com/1000423/3108/i/450/depositphotos_31084019-stock-photo-media-technologies.jpg')", 
    textAlign: 'center',
    padding: '20px',
  },
  links: {
    margin: '20px 0',
  },
  link: {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  searchForm: {
    marginTop: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  newsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  card: {
    width: '300px',
    margin: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px 8px 0 0',
  },
  cardContent: {
    padding: '10px',
  },
};

export default HomePage;
