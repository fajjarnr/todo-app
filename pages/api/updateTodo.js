import { getMinifiedRecord, table } from "./utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;

  try {
    const updateRecords = await table.update([{ id, fields }]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(updateRecords[0]));
  } catch (error) {
    res.statusCode = 500;
    res.json({ msg: "something went wrong" });
  }
};
