import React from "react";

import styles from "./styles.module.css";

const Layout = (props) => {
  const { component } = props;
  return <div className={styles.fullscreen}>{component}</div>;
};

export default Layout;
