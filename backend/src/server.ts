import express from "express";
import { Pool } from "pg";
import cors from "cors";
import multer from "multer";
import uploadFile from "./utils/uploadFile";
import { getFiles } from "./utils/dbHelper";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
//import assignStudentsToReviewFile from "./utils/assignStudents";

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

async function requireLogin(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ message: "Logg inn, hmph." });
  }

  next();
}

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

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

app.get("/api/v1/files", (req, res) => {
  const allFiles = getFiles();
  const frontendSafeFiles = allFiles.map((file) => ({
    id: file.id,
    originalName: file.originalName,
    displayName: file.displayName,
    extension: file.extension,
    createdAt: file.createdAt,
  }));
  res.status(200).json({
    success: true,
    data: frontendSafeFiles,
  });
});

app.get("/api/v1/files/:id", (req, res) => {
  const id = req.params.id;
  const allFiles = getFiles();
  const file = allFiles.find((file) => file.id === Number(id));
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

// app.post("/api/v1/files/:id/distribute", (req, res) => {
//   const id = req.params.id;

//   try {
//     const assigningResult = assignStudentsToReviewFile(id);

//     res.status(200).json({
//       success: true,
//       data: assigningResult,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
