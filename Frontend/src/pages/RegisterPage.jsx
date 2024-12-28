import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, { name, email, password });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create an Account</h1>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}

      <form onSubmit={handleRegister} style={styles.form}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          style={styles.input}
        />

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
          Register
        </button>
      </form>

      <p style={styles.loginText}>
        Already have an account?{" "}
        <a href="/login" style={styles.loginLink}>
          Login here
        </a>
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
  loginText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default RegisterPage;