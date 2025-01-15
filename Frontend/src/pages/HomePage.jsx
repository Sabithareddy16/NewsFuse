
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const loggedInUser = JSON.parse(userString);
        setUser(loggedInUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    fetchNews('latest');
  }, []);

  const fetchNews = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/news/search`, {
        params: { query },
      });
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Error fetching news');
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
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>NewsFuse</h1>
        <div style={styles.authLinks}>
          {user ? (
            <div style={styles.userMenu}>
              <img
                src={user.profilePhoto || '/path/to/default-profile.png'}
                alt="Profile"
                style={styles.profileLogo}
              />
              <span style={styles.userName}>{user.username}</span>
              <span onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </span>
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
                {user && (
                  <div style={styles.bookmarkIcon}>
                    <span>🔖</span> {/* Replace with your preferred icon */}
                  </div>
                )}
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
            <p>No news found</p>
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
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
      profileLogo: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      },
      userName: {
        color: '#fff',
      },
      logoutButton: {
        cursor: 'pointer',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
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
    bookmarkButton: {
      padding: '10px 20px',
      marginTop: '10px',
      backgroundColor: '#f0c14b',
      border: '1px solid #a88734',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  

  bookmarkIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#007bff',
  },
  card: {
    position: 'relative', // Ensure the bookmark icon stays positioned inside the card
    width: '300px',
    margin: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
};

export default HomePage;
