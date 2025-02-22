import { pgPool } from "../config/pg.js";

const fetchDataSql = async () => {
  const { rows } = await pgPool.query("SELECT * FROM public.users");
  return rows;
};

export default fetchDataSql;
