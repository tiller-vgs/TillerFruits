import { prisma } from "../lib/db";
import { User } from "../generated/prisma/browser";

export default async function assignStudentsToReviewFile(
  fileId: number | string,
) {
  const studentList: User[] = await prisma.user.findMany({
    //there is no role yet, so comment it out if youre gonna run backend
    where: {
      role: "student",
    },
  });

  const maxAssignedStudents =
    studentList.length < 5 ? Math.floor(studentList.length / 2) : 5;

  const randomStudents = studentList
    .sort(() => Math.random() - 0.5)
    .slice(0, maxAssignedStudents);

  //then insert both student id's and fileid into assignement table. do it one by one, or through map/foreach.
  // each student should have their own object in assignments, example:
  // assignment 1: fileid4, studentid1, createdat:12/12/12
  // assignment2: fileid4, studentid2, created at 12/12/12

  return {
    fileId,
    assignedStudents: randomStudents.length,
  };
}
