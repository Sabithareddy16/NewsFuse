import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user details if logged in
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Fetch initial news
    fetchNews('latest');
  }, []);

  const fetchNews = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/news`, {
        params: { query },
      });
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('', error);
      setError('');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>NewsFuse</h1>
        <div style={styles.authLinks}>
          {user ? (
            <div style={styles.userMenu}>
              <img src="/path/to/logo.png" alt="Profile Logo" style={styles.profileLogo} />
              <span onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.userName}>
                {user.username}
              </span>
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link to="/bookmarks" style={styles.dropdownItem}>Bookmarks</Link>
                  <span onClick={handleLogout} style={styles.dropdownItem}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </div>
      </header>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/news/sports" style={styles.navLink}>Sports</Link></li>
          <li style={styles.navItem}><Link to="/news/business" style={styles.navLink}>Business</Link></li>
          <li style={styles.navItem}><Link to="/news/entertainment" style={styles.navLink}>Entertainment</Link></li>
          <li style={styles.navItem}><Link to="/news/technology" style={styles.navLink}>Technology</Link></li>
          <li style={styles.navItem}><Link to="/news/politics" style={styles.navLink}>Politics</Link></li>
          <li style={styles.navItem}><Link to="/news/health" style={styles.navLink}>Health</Link></li>
        </ul>
      </nav>
      <main style={styles.container}>
        <h1 style={{ fontSize: '50px' }}>Welcome to NewsFuse</h1>
        <p style={{ fontSize: '25px' }}>Explore personalized content and bookmark your favorite news!</p>
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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div style={styles.newsContainer}>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} style={styles.card}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={styles.image} />}
                <div style={styles.cardContent}>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                  <p><strong>Source:</strong> {article.source.name}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: "url('https://st.depositphotos.com/1000423/3108/i/450/depositphotos_31084019-stock-photo-media-technologies.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
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
  authLinks: {
    display: 'flex',
    gap: '10px',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  userMenu: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  profileLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    cursor: 'pointer',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  dropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'block',
    color: '#333',
    textDecoration: 'none',
  },
  nav: {
    backgroundColor: '#444',
    padding: '10px 20px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    fontSize: '20px',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    padding: '20px',
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