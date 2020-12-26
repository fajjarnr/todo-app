import { getMinifiedRecord, table } from "./utils/Airtable";
import auth0 from "./utils/auth0";
import ownsRecord from "../api/middleware/OwnsRecord";

export default ownsRecord(async (req, res) => {
  const { id } = req.body;
  const { user } = await auth0.getSession(req);

  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (error) {
    res.statusCode = 500;
    res.json({ msg: "something went wrong" });
  }
});
