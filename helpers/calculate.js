const calculateData = (data) => {
  const outputArray = [];

  const INTERVAL_MIDPOINT_DEFAULT = 1000;
  const WIDTH = 2000;

  const intervalEndpoints = [
    2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000,
  ];

  const allIntervalEndpoints = [0, ...intervalEndpoints];

  const firstSurvival = 1;

  const nElements = [];
  const dElements = [];
  const wElements = [];
  const survivals = [];
  const survivalsOutput = [];
  const hazards = [];
  const hazardsOutput = [];

  //n, d, w elements
  for (const element of intervalEndpoints) {
    let dElement = 0;
    let wElement = 0;
    let previousElement = element !== 0 ? element - 2000 : 0;

    for (const object of data) {
      const timeToFailure = parseInt(object.timeToFailure);

      if (timeToFailure <= element && timeToFailure >= previousElement) {
        if (object.action === "F") {
          dElement++;
        } else {
          wElement++;
        }
      }
    }

    const nElement =
      (nElements.length === 0 ? data.length : nElements[nElements.length - 1]) -
      (dElements.length === 0 ? 0 : dElements[dElements.length - 1]) -
      (wElements.length === 0 ? 0 : wElements[wElements.length - 1]);

    dElements.push(dElement);
    wElements.push(wElement);
    nElements.push(nElement);
  }

  //survival
  for (let i = 0; i < intervalEndpoints.length; i++) {
    let survival = 0;

    if (intervalEndpoints[i] === 2000) {
      survival =
        firstSurvival * (1 - dElements[i] / (nElements[i] - wElements[i] / 2));
    }

    if (intervalEndpoints[i] > 2000) {
      survival =
        survivals[survivals.length - 1] *
        (1 - dElements[i] / (nElements[i] - wElements[i] / 2));
    }

    survivals.push(survival);
  }

  //hazard
  for (let i = 0; i < intervalEndpoints.length; i++) {
    const hazard =
      (survivals[i] * dElements[i]) /
      ((nElements[i] - 0.5 * wElements[i]) * WIDTH);

    hazards.push(hazard);
  }

  //output array of objects
  for (let i = 0; i < 9; i++) {
    if (i === 0) {
      outputArray.push({
        intervalEndpoint: 0,
        n: null,
        d: null,
        w: null,
        survival: 1,
        intervalMidpoint: INTERVAL_MIDPOINT_DEFAULT,
        hazard: hazards[i],
      });
    } else {
      outputArray.push({
        intervalEndpoint: intervalEndpoints[i - 1],
        n: nElements[i - 1],
        d: dElements[i - 1],
        w: wElements[i - 1],
        survival: survivals[i - 1],
        intervalMidpoint:
          intervalEndpoints[i - 1] === 16000
            ? null
            : intervalEndpoints[i - 1] + INTERVAL_MIDPOINT_DEFAULT,
        hazard: hazards[i] === undefined ? null : hazards[i],
      });
    }
  }

  // survivals output for charts
  for (let i = 0; i < allIntervalEndpoints.length; i++) {
    if (allIntervalEndpoints[i] === 0) {
      survivalsOutput.push({
        x: allIntervalEndpoints[i],
        y: 1,
      });
    } else {
      survivalsOutput.push({
        x: allIntervalEndpoints[i],
        y: survivals[i - 1],
      });
    }
  }

  // hazards output for charts
  for (let i = 0; i < intervalEndpoints.length; i++) {
    hazardsOutput.push({
      x: intervalEndpoints[i] - INTERVAL_MIDPOINT_DEFAULT,
      y: hazards[i],
    });
  }

  return { outputArray, survivals: survivalsOutput, hazards: hazardsOutput };
};

export default calculateData;
