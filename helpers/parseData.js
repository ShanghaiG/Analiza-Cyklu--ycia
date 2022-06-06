const parseData = (data) => {
  let parsedData = JSON.parse(data);
  parsedData.splice(0, 2);

  const outputArray = [];

  for (const line of parsedData) {
    outputArray.push({
      serialNumber: line["Study name"],
      action: line["Transformers data"],
      timeToFailure: line.field3,
    });
  }

  return outputArray;
};

export default parseData;
