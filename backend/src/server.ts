import express from "express";

import { Pool } from "pg";
import cors from "cors";
import multer from "multer";
import uploadFile from "./utils/uploadFile";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import assignStudentsToReviewFile from "./utils/assignStudents";
import {
  fetchAllFiles,
  fetchAllFilesByIdFrontend,
  fetchInternalFile,
  fetchSingularFileFrontend,
  fetchUserFiles,
  updateFileStatus,
} from "./services/fileService";
import { getFilePath } from "./utils/getFilePath";

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
app.post(
  "/api/v1/files/upload",
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

    const userId = req.session.user.id;

    try {
      const { buffer, originalname } = req.file;
      await uploadFile(buffer, originalname, userId);

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

//for sending of files ADMIN
app.post(
  "/api/v1/admin/files/:id/distribute",
  requireLogin,
  async (req, res) => {
    const id = Number(req.params.id);

    try {
      //check if file has already been sent
      const file = await fetchInternalFile(id);
      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      if (file.status === "sent") {
        return res.status(409).json({
          success: false,
          message: "File has already been distributed",
        });
      }

      // if file is new, assign students and make new assignement
      const { fileId, studentAmount } = await assignStudentsToReviewFile(
        Number(id),
      );

      if (!fileId) throw new Error("No file found");
      await updateFileStatus(fileId, "sent");

      res.status(200).json({
        success: true,
        message: `File sent to ${studentAmount} students`,
        data: { fileId, studentAmount },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

//file preview ADMIN/ auth student
app.get("/api/v1/files/:id/content", requireLogin, async (req, res) => {
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
    const assignmentFiles = await fetchUserFiles(userId);
    const myAssignmentFiles = await fetchAllFilesByIdFrontend(userId);

    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: { assignmentFiles, myAssignmentFiles },
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
