import express from "express";
import { Pool } from "pg";
import cors from "cors";
import multer from "multer";
import uploadFile from "./utils/uploadFile";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import assignStudentsToReviewFile from "./utils/assignStudents";
import {
  fetchAllFiles,
  fetchSingularFile,
  fetchUserFiles,
} from "./utils/dbQuerier";
import { TempAssignment } from "./types/types";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "1234",
  database: "mydb",
});

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

//For students uploading files
app.post("/api/v1/files/upload", upload.single("file"), async (req, res) => {
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

//why are we using this again... are we using this??? do we need this?? ill let it sit for now.
app.get("/api/v1/files", async (req, res) => {
  try {
    const allFiles = await fetchAllFiles();

    res.status(200).json({
      success: true,
      data: allFiles,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//for file previews, split screens, singular file pages
app.get("/api/v1/files/:id", async (req, res) => {
  const id = req.params.id;
  const file = await fetchSingularFile(Number(id));
  if (!file) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }
  res.status(200).json({
    success: true,
    data: file,
  });
});

//for sending of files
app.post("/api/v1/files/:id/distribute", (req, res) => {
  const id = req.params.id;

  try {
    const assigningResult = assignStudentsToReviewFile(id);

    res.status(200).json({
      success: true,
      data: assigningResult,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//for students to see all their assigned files
app.get("/api/v1/me/assignments", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Denied access.",
      });
    }

    const files = await fetchUserFiles(session.user.id);

    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: files,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
