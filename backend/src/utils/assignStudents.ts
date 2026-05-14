import { prisma } from "../lib/db";
import { User } from "../generated/prisma/browser";
import { fetchInternalFile } from "../services/fileService";
import generateRandomDisplayName from "./generateRandomDisplayName";

export default async function assignStudentsToReviewFile(fileId: number) {
  const studentList: User[] = await prisma.user.findMany({
    where: {
      role: "student",
    },
  });

  const fileToAssign = await fetchInternalFile(fileId);

  if (!fileToAssign) {
    throw new Error("File not found");
  }

  const maxAssignedStudents =
    studentList.length < 5 ? Math.floor(studentList.length / 2) : 5;

  const randomStudents = studentList
    .sort(() => Math.random() - 0.5)
    .slice(0, maxAssignedStudents);

  const studentAmount = randomStudents.length;

  const assignments = await prisma.assignment.createMany({
    data: await Promise.all(
      randomStudents.map(async (student) => ({
        fileId,
        creatorId: fileToAssign.creatorId,
        userId: student.id,
        anonDisplayName: await generateRandomDisplayName(),
      })),
    ),
  });

  console.log(assignments);

  return { fileId, studentAmount };
}
