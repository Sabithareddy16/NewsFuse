import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage("");

    try {
      // Make sure the URL here is correct, including the environment variable
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });

      // Store the JWT token in localStorage for further authenticated requests
      localStorage.setItem("authToken", response.data.token);

      alert("Login successful! Welcome to NewsFuse.");
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to NewsFuse</h1>
      <p style={styles.subtext}>
        Explore personalized content and bookmark your favorite news!
      </p>

      {errorMessage && <p style={styles.error}>{errorMessage}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={styles.input}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={styles.registerText}>
        Don't have an account?{" "}
        <Link to="/register" style={styles.registerLink}>
          Register here
        </Link>
      </p>
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
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  subtext: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  registerText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  registerLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default LoginPage;