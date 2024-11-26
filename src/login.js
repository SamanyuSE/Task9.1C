import React, { useState } from "react";
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGooglePopup, createUserDocFromAuth } from "./firebase";
import logo from './logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setMessage("User logged in successfully");
      navigate('/profile');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocFromAuth(user);
      console.log("User signed in with Google:", user);
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="login">
      <h4>Log In</h4>
      <form onSubmit={handleSubmit}>
        <div className="area">
          <label>Your email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="area">
          <label>Your Password</label>
          <input
            type="password"
            className="input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="button login-button">
          Log In
        </button>

        <button type="button" className="google" onClick={handleGoogleSignIn}>
          <div className="google-button-content">
            <img src={logo} alt="Your Logo" className="logo" />
            Log in with Google
          </div>
        </button>

        <p className="user">
          New User? <Link to="/signup">Sign Up here!</Link>
        </p>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Login;