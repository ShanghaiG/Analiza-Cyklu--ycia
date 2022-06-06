import React, { useEffect, useState } from "react";
import Hazard from "../Charts/Hazard/Hazard";
import SurvivalDistribution from "../Charts/SurvivalDistribution/SurvivalDistribution";

import styles from "./styles.module.css";

const Button = (props) => {
  const { description } = props;

  const [data, setData] = useState("");
  const [importedData, setImportedData] = useState([]);
  const [isCalled, setIsCalled] = useState(false);

  const uploadFile = () => {
    document.getElementById("selectFile").click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = (e) => {
      setData(e.target.result);
    };
  };

  const callData = async (data) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responded = await response.json();

    setImportedData(responded);

    return responded;
  };

  useEffect(() => {
    if (data && !isCalled) {
      callData(data);
      setIsCalled(true);
    }
  });

  console.log("dane", importedData);

  return (
    <>
      <div>
        <div className={styles.button} onClick={uploadFile}>
          {description}

          <input
            id="selectFile"
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </div>

        <div className={styles.hazard}>
          <Hazard hazardData={importedData?.hazards} />
        </div>

        <div className={styles.survivalDistribution}>
          <SurvivalDistribution
            survivalDistributionData={importedData?.survivals}
          />
        </div>
      </div>
    </>
  );
};

export default Button;
