import React from "react";
import styles from "./Register.module.css";

import userPageImage from "../../assets/images/loginimg.png";
const Register = () => {
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerPageLeft}>
        <div className={styles.registerLeftHead}>
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
        </div>

        <div className={styles.registerForm}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="number" placeholder="Mobile"/>
          <input type="password" placeholder="Password" />
        </div>
<div className={styles.registerCheckbox}><input type="checkbox" />By creating an account, I agree to our terms of use and privacy policy</div>
        <div className={styles.registerBtn}>
          <button>Create Account</button>
        </div>

        <div className={styles.registerFooterText}>
          <span>Already have an account? </span>
          <u>Sign In</u>
        </div>
      </div>

      <div className={styles.registerRight}>
        <p className={styles.imgText}>Your Personal Job Finder</p>
        <img src={userPageImage} alt="img" />
      </div>
    </div>
  );
};

export default Register;
