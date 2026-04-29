import express from "express";
<<<<<<< Updated upstream
import { pool } from "./db";
=======
import { Pool } from "pg";
>>>>>>> Stashed changes

const app = express();
const PORT = 5000;

app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "1234",
  database: "mydb",
});

// тест
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;

  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    password,
  ]);

  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
