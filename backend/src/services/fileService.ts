import { Submission } from "./../generated/prisma/browser";
import { FileStatus } from "../generated/prisma/browser";
import { prisma } from "../lib/db";
import { toFrontendFile } from "../mappers/file.mapper";
import { fetchUserAssignments } from "./assignmentService";
import { toFrontendSubmission } from "../mappers/submission.mapper";

//all files. unsure why we're using it. if you know please comment.
export async function fetchAllFiles() {
  const files = await prisma.file.findMany();
  return files.map(toFrontendFile);
}

//For student MyPage.
// Fetches all the submissions user has been assigned to review together with important data
export async function fetchAssignedSubmissions(userId: string) {
  const assignedFiles = await prisma.submission.findMany({
    where: {
      reviewers: {
        some: {
          reviewerId: userId,
        },
      },
    },
    include: {
      file: true,
      assignment: true,
      creator: true,
    },
  });

  return assignedFiles;
}

//for singular file data in frontend. Used for /:id pages.
export async function fetchSingularFileFrontend(fileId: number) {
  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
    },
  });
  if (!file) return null;

  return toFrontendFile(file);
}

//for all file data in frontend based on creatorID. used in mypage/creatorAssignments
export async function fetchAllSubmissionsByCreatorId(creatorId: string) {
  const allUserSubmissions = await prisma.submission.findMany({
    where: {
      creatorId,
    },

    include: {
      assignment: {
        include: {
          questions: true,
        },
      },

      reviewers: true,

      file: true,
    },
  });

  return allUserSubmissions.map(toFrontendSubmission);
}

//for backend that needs extra file information
export async function fetchInternalFile(fileId: number) {
  const files = await prisma.file.findFirst({
    where: { id: fileId },
  });

  return files;
}

//Updates status on sending of file
export async function updateFileStatus(fileId: number, status: FileStatus) {
  const updatedFile = await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      status,
    },
  });

  return updatedFile;
}
