import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/news/search`, {
          params: { query }
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Error fetching search results');
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div style={styles.newsContainer}>
          {results.map((result, index) => (
            <div key={index} style={styles.card}>
              {result.urlToImage && <img src={result.urlToImage} alt={result.title} style={styles.image} />}
              <div style={styles.cardContent}>
                <h2>{result.title}</h2>
                <p>{result.description}</p>
                <p><strong>Published At:</strong> {new Date(result.publishedAt).toLocaleString()}</p>
                <p><strong>Source:</strong> {result.source.name}</p>
                <a href={result.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  newsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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

export default SearchResults;