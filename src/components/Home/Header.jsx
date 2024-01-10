import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useJobContext from "../../hooks/useJobContext";
import img from "../../assets/images/img.png";
const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useJobContext();
  const userName = localStorage.getItem("name");
  const loginPage = () => {
    navigate("/login");
  };

  const signupPage = () => {
    navigate("/register");
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="job__title">JobFinder</div>
      {loggedIn ? (
        <div className="user__icon">
          <button onClick={logout}>Logout</button>
          <span>Hello {userName}!</span>
          <img
            src={img}
            alt=""
          />
        </div>
      ) : (
        <div className="signup__buttons">
          <button className="header__login" onClick={loginPage}>
            Login
          </button>
          <button className="header__register" onClick={signupPage}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
