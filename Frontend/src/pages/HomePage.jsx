import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>NewsFuse</h1>
        <div style={styles.authLinks}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
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
    fontSize: '20px', // Increased font size for categories
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
};

export default HomePage;