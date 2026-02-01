import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test Connection
pool.connect()
  .then(() => {
    console.log("🟢 Database Connected Successfully");
  })
  .catch((err) => {
    console.error("🔴 Database Connection Failed:", err.message);
  });

export default pool;

