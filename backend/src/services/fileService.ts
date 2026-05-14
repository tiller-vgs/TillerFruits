import { File, FileStatus } from "../generated/prisma/browser";
import { prisma } from "../lib/db";
import { toFrontendFile } from "../mappers/file.mapper";
import { fetchUserAssignments } from "./assignmentService";

//all files. unsure why we're using it. if you know please comment.
export async function fetchAllFiles() {
  const files = await prisma.file.findMany();
  return files.map(toFrontendFile);
}

//for user assignments
export async function fetchUserFiles(userId: string) {
  const userAssignments = await fetchUserAssignments(userId);

  const fileIds = userAssignments.map((a) => a.fileId);
  const assignmentFiles = await prisma.file.findMany({
    where: {
      id: {
        in: fileIds,
      },
    },
  });

  return assignmentFiles.map(toFrontendFile);
}

//for singular file data in frontend
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
export async function fetchAllFilesByIdFrontend(creatorid: string) {
  const files = await prisma.file.findMany({
    where: {
      creatorId: creatorid,
    },
  });
  if (!files) return null;

  return files.map(toFrontendFile);
}

//for backend that needs extra file information
export async function fetchInternalFile(fileId: number) {
  const files = await prisma.file.findFirst({
    where: { id: fileId },
  });

  return files;
}

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
