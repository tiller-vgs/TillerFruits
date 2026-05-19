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
  fetchAllSubmissionsByCreatorId,
  fetchAssignedSubmissions,
  fetchSingularFileFrontend,
  fetchSingularSubmission,
  fetchUserSubmissionForAssignment,
} from "./services/fileService";
import {
  fetchSingularAssignment,
  fetchRecipientAssignments,
} from "./services/assignmentService";
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
// requres login, checks if a session exists (aka user logged in)
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

//for teachers/admins to create new assignments
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

//file preview PUBLIC
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

//for students to see all their assigned submissions and their own submissions
app.get("/api/v1/me/schoolwork", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const assignedSubmissions = await fetchAssignedSubmissions(userId);
    const userSubmissions = await fetchAllSubmissionsByCreatorId(userId);
    const recipientAssignments = await fetchRecipientAssignments(userId);

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: { assignedSubmissions, userSubmissions, recipientAssignments },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//for assignment page: returns assignment details + user's own submission (if any)
app.get("/api/v1/me/assignments/:assignmentId", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const assignmentId = Number(req.params.assignmentId);

    const assignment = await fetchSingularAssignment(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    const mySubmission = await fetchUserSubmissionForAssignment(userId, assignmentId);

    res.status(200).json({
      success: true,
      data: { assignment, mySubmission },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//for singular submission page (both my-submissions and other-submissions)
app.get("/api/v1/submissions/:submissionId", requireLogin, async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);
    const submission = await fetchSingularSubmission(submissionId);

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
