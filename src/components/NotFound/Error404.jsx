import React from "react";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.error404}>
      <h1 className={styles.error404__title}>404 Error</h1>
      <p className={styles.error404__message}>
        Oops! The page you are looking for could not be found.
      </p>
    </div>
  );
};

export default Error404;