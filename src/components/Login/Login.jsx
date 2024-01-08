import React,{useState,useEffect} from "react";
import styles from "./Login.module.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASEURL from "../../constants/baseurl";

import userPageImage from "../../assets/images/loginimg.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupRedirect = () => {
    navigate("/register");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login=()=>{
    axios
    .post(`${BASEURL}/login`, {
      email,
      password,
    })
    .then((response) => {
      const { token, expirationTime } = response.data;
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenExpiration", expirationTime);
      
      navigate("/");
    })
    .catch((error) => {
      toast.error("Incorrect Email or Password. Try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      console.error("Login failed", error); // Handle any error response if needed
    })
    .finally(() => {
      setLoading(false);
    });
  }
  useEffect(() => {
    // Check token expiration on component mount
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
      // Token has expired, prompt the user to re-login
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }, []);
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageLeft}>
        <div className={styles.loginLeftHead}>
          <h1>Already have an account?</h1>
          <p>Your personal job finder is here</p>
        </div>

        <div className={styles.loginForm}>
          <input type="email"  onChange={handleEmail} placeholder="Email" />
          <input type="password"  onChange={handlePassword} placeholder="Password" />
        </div>

        <div className={styles.loginBtn}>
        <button id="login__signin" onClick={login} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>

        <div className={styles.loginFooterText}>
          <span>Don't have an account? </span>
          <u onClick={signupRedirect}>Sign Up</u>
        </div>
      </div>

      <div className={styles.loginRight}>
        <p className={styles.imgText}>Your Personal Job Finder</p>
        <img src={userPageImage} alt="img" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
