import { prisma } from "../lib/db";
import { fetchInternalFile, updateFileStatus } from "../services/fileService";
import { assignStudentsToReviewFile } from "../utils/assignStudents";
import generateRandomDisplayName from "./generateRandomDisplayName";

export default async function afterUploadSending(
  fileId: number,
  assignmentId: number,
  creatorId: string,
) {
  //check if file has already been sent
  const file = await fetchInternalFile(fileId);
  if (!file) {
    throw new Error("File not found");
  }
  if (file.status === "sent") {
    throw new Error("File has already been distributed");
  }

  // if file is new, assign students and make new submission to review
  const { randomStudents, studentAmount } =
    await assignStudentsToReviewFile(fileId);

  //generates randomised anonymous names for each recipent
  const anonNames = await Promise.all(
    randomStudents.map(() => generateRandomDisplayName()),
  );

  //the setup of creation looks weird, this is because these are relations.
  // creates new submission with the file and all different data needed to fulfill requirements
  const uploadedSubmission = await prisma.submission.create({
    data: {
      assignment: {
        connect: { id: assignmentId },
      },
      creator: {
        connect: { id: creatorId },
      },
      file: {
        connect: { id: fileId },
      },
      reviewers: {
        create: randomStudents.map((s, i) => ({
          anonName: anonNames[i],

          reviewer: {
            connect: { id: s.id },
          },
        })),
      },
    },
  });

  console.log(uploadedSubmission);

  if (!fileId) throw new Error("No file found");
  await updateFileStatus(fileId, "sent");
  return uploadedSubmission;
}
