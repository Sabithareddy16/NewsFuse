import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsByCategory = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log(`Fetching news for category: ${category}`);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/news/category/${category}`);
        console.log(`News fetched successfully for category: ${category}`);
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err.message);
        setError('Error fetching news');
        setLoading(false);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 60000); // Fetch news every 60 seconds

    return () => clearInterval(intervalId); 
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>News in {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div style={styles.newsContainer}>
        {articles.map((article, index) => (
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
        ))}
      </div>
    </div>
  );
};

const styles = {
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

export default NewsByCategory;