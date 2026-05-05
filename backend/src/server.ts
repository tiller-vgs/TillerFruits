import express from "express";
import { pool } from "./db";
import { Pool } from "pg";

const app = express();
const PORT = 5000;

import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import uploadFile from "./utils/uploadFile";

const app = express();
const PORT = 3000;
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });


app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "1234",
  database: "mydb",
});

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
app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("File doesnt exist or wasnt uploaded.");
    return res.status(400).send("File doesnt exist or wasnt uploaded.");
  }

  try {
    const { buffer, originalname } = req.file;
    await uploadFile(buffer, originalname);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/v1/uploads", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
