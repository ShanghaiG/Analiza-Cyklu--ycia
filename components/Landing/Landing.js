import React, { useEffect, useState } from "react";
import Layout from "../Layout";

import styles from "./styles.module.css";
import Button from "../Button";
import Hazard from "../Charts/Hazard";
import SurvivalDistribution from "../Charts/SurvivalDistribution";

const Main = () => {
  return (
    <>
      <div className={styles.item}>
        <h1 className={styles.h1Light}>LIFE TABLE METHOD</h1>
      </div>

      <div className={styles.button}>
        <Button description={"WGRAJ DANE"} />
      </div>

      {/* <div className={styles.hazard}>
        <Hazard />
      </div>

      <div className={styles.hazard}>
        <SurvivalDistribution />
      </div> */}
    </>
  );
};

const Landing = () => {
  return <Layout component={<Main />} />;
};

export default Landing;
