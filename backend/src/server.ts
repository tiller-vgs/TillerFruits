import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import uploadFile from "./utils/uploadFile";

const app = express();
const PORT = 3000;
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// fs.writeFile("")

app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("File doesnt exist or wasnt uploaded.");
    return res.status(400).send("File doesnt exist or wasnt uploaded.");
  }

  const { buffer, originalname } = req.file;
  uploadFile(buffer, originalname);
});

app.get("/api/v1/uploads", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
