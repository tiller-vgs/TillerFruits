import express from "express";

import { Pool } from "pg";
import cors from "cors";
import multer from "multer";
import uploadFile from "./utils/uploadFile";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import { assignAllStudents } from "./utils/assignStudents";
import {
  fetchAllFiles,
  fetchAllFilesByIdFrontend,
  fetchSingularFileFrontend,
  fetchUserFiles,
} from "./services/fileService";
import { getFilePath } from "./utils/getFilePath";
import afterUploadSending from "./utils/afterUploadSending";

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

  req.session = session;

  next();
}

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

//For students uploading files
//BUGGED
app.post(
  "/api/v1/assignments/:id/upload",
  upload.single("file"),
  requireLogin,
  async (req, res) => {
    if (!req.file) {
      console.log("File doesnt exist or wasnt uploaded.");
      return res.status(400).json({
        success: false,
        message: "File doesnt exist or wasnt uploaded.",
      });
    }

    try {
      const userId = req.session.user.id;
      const assignmentId = Number(req.params.id);

      const { buffer, originalname } = req.file;
      const createdFile = await uploadFile(
        buffer,
        originalname,
        userId,
        assignmentId,
      );

      const fileId: number = createdFile.id;
      const results = await afterUploadSending(fileId, assignmentId, userId);
      res.status(200).json({
        success: true,
        message: "File uploaded and sent successfully",
        data: results,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
);

//why are we using this again... are we using this??? do we need this?? ill let it sit under admin for now.
app.get("/api/v1/admin/files", requireLogin, async (req, res) => {
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
app.get("/api/v1/files/:id", requireLogin, async (req, res) => {
  const id = req.params.id;
  const file = await fetchSingularFileFrontend(Number(id));
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

app.post("/api/v1/admin/create-assignment", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { assignmentTitle, questions } = req.body;

    if (!assignmentTitle || !questions) {
      return res.status(400).json({
        success: false,
        message: "Missing assignmentTitle or questions",
      });
    }

    const newAssignment = await assignAllStudents(assignmentTitle, questions);

    res.status(200).json({
      success: true,
      message: "Created new assignment",
      data: newAssignment,
    });
  } catch (error: any) {
    console.error("CREATE ASSIGNMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//file preview ADMIN/ auth student
app.get("/api/v1/files/:id/content", async (req, res) => {
  try {
    const fileId = Number(req.params.id);
    const { fullFilePath, mimeType } = await getFilePath(fileId);

    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", "inline");
    return res.sendFile(fullFilePath);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Could not fetch file",
    });
  }
});

//for students to see all their assigned files
app.get("/api/v1/me/assignments", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { assignmentFiles, totalAssignmentFiles } =
      await fetchUserFiles(userId);
    const { files, totalFiles } = await fetchAllFilesByIdFrontend(userId);

    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: { assignmentFiles, totalAssignmentFiles, files, totalFiles },
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
