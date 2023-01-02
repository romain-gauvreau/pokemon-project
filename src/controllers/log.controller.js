import { Parser } from "json2csv";
import catchAsync from "../utils/catchAsync.js";
import { Log } from "../models/index.js";

const getAllLogsInCsv = catchAsync(async (req, res) => {
  const fields = [
    "id",
    "date",
    "route",
    "method",
    "statusCode",
    "responseTime",
  ];
  const data = await Log.findAll();
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment("logs.csv");
  res.send(csv);
});

export { getAllLogsInCsv };
