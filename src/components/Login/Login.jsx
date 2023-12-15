import React from "react";
import styles from "./Login.module.css";

import userPageImage from "../../assets/images/loginimg.png";
const Login = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageLeft}>
        <div className={styles.loginLeftHead}>
          <h1>Already have an account?</h1>
          <p>Your personal job finder is here</p>
        </div>

        <div className={styles.loginForm}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>

        <div className={styles.loginBtn}>
          <button>Sign In</button>
        </div>

        <div className={styles.loginFooterText}>
          <span>Don't have an account? </span>
          <u>Sign Up</u>
        </div>
      </div>

      <div className={styles.loginRight}>
        <p className={styles.imgText}>Your Personal Job Finder</p>
        <img src={userPageImage} alt="img" />
      </div>
    </div>
  );
};

export default Login;
