import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userPageImage from "../../assets/images/loginimg.png";
import useJobContext from "../../hooks/useJobContext";
import BASEURL from "../../constants/baseurl";

const Register = () => {
  const [userName,setUserName]=useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASEURL}/register`, {
        name,
        email,
        mobile,
        password,
      })
      .then((res) => {
        setRegistrationSuccess(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        toast.success("Registration Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        setUserName(res.data.name);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error("User already exists. Please Login!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return;
        }
      });
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  const addjob=()=>{
    navigate("/addjob")
  }
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerPageLeft}>
        <form onSubmit={handleSubmit}>
          <div className={styles.registerLeftHead}>
            <h1>Create an account</h1>
            <p>Your personal job finder is here</p>
          </div>

          <div className={styles.registerForm}>
            <div>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text" 
                placeholder="Mobile"
              />
            </div>
            <div>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className={styles.registerCheckbox}>
            <input type="checkbox" />
            By creating an account, I agree to our terms of use and privacy policy
          </div>

          <div className={styles.registerBtn}>
            <button type="submit">Register</button>
          </div>
        </form>

        <div className={styles.registerFooterText}>
          {registrationSuccess ? (
            <span>
              Registration successful! Please <u onClick={addjob}>log in</u>.
            </span>
          ) : (
            <span>
              Already have an account? <u onClick={loginRedirect}>Sign In</u>
            </span>
          )}
        </div>
      </div>

      <div className={styles.registerRight}>
        <p className={styles.imgText}>Your Personal Job Finder</p>
        <img src={userPageImage} alt="img" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
