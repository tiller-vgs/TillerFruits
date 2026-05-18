import { prisma } from "../lib/db";
import { Question, User } from "../generated/prisma/browser";
import { fetchInternalFile } from "../services/fileService";
import generateRandomDisplayName from "./generateRandomDisplayName";

export async function assignStudentsToReviewFile(fileId: number) {
  const fileToAssign = await fetchInternalFile(fileId);
  const studentList: User[] = await prisma.user.findMany({
    where: {
      role: "student",
      id: {
        not: fileToAssign!.creatorId,
      },
    },
  });

  if (!fileToAssign) {
    throw new Error("File not found");
  }

  const maxAssignedStudents =
    studentList.length < 15 ? Math.floor(studentList.length / 2) : 5;

  const randomStudents = studentList
    .sort(() => Math.random() - 0.5)
    .slice(0, maxAssignedStudents);

  const studentAmount = randomStudents.length;

  return { randomStudents, studentAmount };
}

export async function assignAllStudents(
  assignmentTitle: string,
  questions: { title: string }[],
) {
  const studentList: User[] = await prisma.user.findMany({
    where: {
      role: "student",
    },
  });

  const studentAmount = studentList.length;
  const displayNames = await Promise.all(
    studentList.map(() => generateRandomDisplayName()),
  );

  const assignment = await prisma.assignment.create({
    data: {
      title: assignmentTitle,

      questions: {
        create: questions.map((q) => ({
          title: q.title,
        })),
      },

      users: {
        create: studentList.map((s, i) => ({
          anonDisplayName: displayNames[i],
          user: {
            connect: { id: s.id },
          },
        })),
      },
    },
  });

  console.log(assignment);

  return { studentAmount };
}
