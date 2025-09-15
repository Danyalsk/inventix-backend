import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

// Test initial connection
(async () => {
  try {
    const client = await pgPool.connect();
    console.log("Connected to the database");
    client.release(); // release immediately to pool
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();

// Handle unexpected errors (client-level)
pgPool.on("error", (err) => {
  console.error("Unexpected database error on idle client", err);
  // Do NOT try to reconnect here manually
});
