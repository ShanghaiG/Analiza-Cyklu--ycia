import calculateData from "../../helpers/calculate";
import parseData from "../../helpers/parseData";

export default async (req, res) => {
  const file = JSON.parse(req.body);

  const parsedData = parseData(file);
  const calculatedData = calculateData(parsedData);

  res.statusCode = 200;
  res.json(calculatedData);
};
