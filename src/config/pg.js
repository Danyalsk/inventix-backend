import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

try {
  await pgPool.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error("Failed to connect to the database:", error);
}

pgPool.on("error", async () => {
  await pgPool.connect();
});
