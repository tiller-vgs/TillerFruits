import { File } from "../generated/prisma/browser";
import { prisma } from "../lib/db";
import { toFrontendFile } from "../mappers/file.mapper";
import { fetchUserAssignments } from "./assignmentService";

function convertFilesIntoFrontendSafeFiles(backendFileArray: File[]) {
  const frontendSafeFiles = backendFileArray.map((file) => ({
    id: file.id,
    originalName: file.originalName,
    displayName: file.displayName,
    extension: file.extension,
    createdAt: file.createdAt,
  }));

  return frontendSafeFiles;
}

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

//for backend that needs extra file information
export async function fetchInternalFile(fileId: number) {
  const files = await prisma.file.findFirst({
    where: { id: fileId },
  });

  return files;
}
