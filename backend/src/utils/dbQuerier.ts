import { File } from "../generated/prisma/browser";
import { prisma } from "../lib/db";
import { TempAssignment } from "../types/types";

function convertFilesIntoFrontendSafeFiles(backendFileArray: File[]) {
  const frontendSafeFiles = backendFileArray.map((file) => ({
    id: file.id,
    originalName: file.originalName,
    displayName: file.displayName,
    extension: file.extension,
    createdAt: file.createdAt,
  }));

  return frontendSafeFiles
}

//all files. unsure why we're using it. if you know please comment.
export async function fetchAllFiles() {
  const allFiles = await prisma.file.findMany();

  const safeFiles = convertFilesIntoFrontendSafeFiles(allFiles);

  console.log("FetchAllFiles, UtilDB answered:" + allFiles);
  return safeFiles;
}

//for user assignments
export async function fetchUserFiles(userId: string) {
  const userAssignments: TempAssignment[] = await prisma.file.findMany({
    //QUERY ASSIGNMENT TABLE NOT FILE. ASSIGNMENT TABLE DOESNT EXIST YET SO I FETCH DIRECTLY FROM FILE
    where: {
      creatorId: userId,
    },
  });

  const fileIds = userAssignments.map((a) => a.id);
  const assignmentFiles = await prisma.file.findMany({
    where: {
      id: {
        in: fileIds,
      },
    },
  });

  console.log("FetchUserFiles, UtilDB answered:" + assignmentFiles);
  const safeFiles = convertFilesIntoFrontendSafeFiles(assignmentFiles);

  return safeFiles;
}

//for singular file pages and preview in split screen
export async function fetchSingularFile(fileId: number) {
  const file = await prisma.file.findFirst({
    where: {
      id: fileId,
    },
  });

  console.log("FetchSingularFile, UtilDB answered:" + file);
  return file;
}
