import axios from "axios";
import { pgPool } from "../config/pg";

const fetchData = async () => {
  const query = `{
    auth_users {
        name
    }
    }`;

  const { data } = await axios.post(
    "https://tymnwgsergrzbmnjmbps.hasura.ap-south-1.nhost.run/v1/graphql",
    {
      query,
    },

    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "11Ah35@,C-i+w:gm2M=gm&AFKUXNfEK'",
      },
    }
  );

  return data;
};

module.exports = { fetchData };
