import { prisma } from "../lib/db";
import { User } from "../generated/prisma/browser";
import { fetchInternalFile } from "../services/fileService";

//Generates a couple of random students. Generating is based upon the size of the database.
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

// Assigns all students, no generations.
//Since util is short and only used by admins, it also makes a creation query of the assignment and all the users/students
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
  const assignment = await prisma.assignment.create({
    data: {
      title: assignmentTitle,

      questions: {
        create: questions.map((q) => ({
          title: q.title,
        })),
      },

      recipents: {
        create: studentList.map((s, i) => ({
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
