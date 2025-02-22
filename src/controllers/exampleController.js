import fetchDataSql from "../services/get.js";

const getSqlData = async (req, res) => {
  try {
    const data = await fetchDataSql();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getSqlData;
