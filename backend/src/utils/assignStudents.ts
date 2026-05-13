import { prisma } from "../lib/db";
import { User } from "../generated/prisma/browser";
import { fetchSingularFile } from "../services/fileService";
import generateRandomDisplayName from "./generateRandomDisplayName";

export default async function assignStudentsToReviewFile(fileId: number) {
  const studentList: User[] = await prisma.user.findMany({
    //there is no role yet, so comment it out if youre gonna run backend
    where: {
      role: "student",
    },
  });

  const fileToAssign = await fetchSingularFile(fileId);

  if (!fileToAssign) {
    throw new Error("File not found");
  }

  const maxAssignedStudents =
    studentList.length < 5 ? Math.floor(studentList.length / 2) : 5;

  const randomStudents = studentList
    .sort(() => Math.random() - 0.5)
    .slice(0, maxAssignedStudents);

  //then insert both student id's and fileid into assignement table. do it one by one, or through map/foreach.
  // each student should have their own object in assignments, example:
  // assignment 1: fileid4, studentid1, createdat:12/12/12
  // assignment2: fileid4, studentid2, created at 12/12/12

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

  return {
    fileId,
    assignedStudents: randomStudents.length,
  };
}
