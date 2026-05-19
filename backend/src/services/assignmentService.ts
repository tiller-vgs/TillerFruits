import { prisma } from "../lib/db";
import { toFrontendAssignment } from "../mappers/assignment.mapper";

export async function fetchUserAssignments(userId: string) {
  const userAssignments = await prisma.assignment.findMany({
    where: {
      userId: userId,
    },
  });
  return userAssignments;
}

//fetches all assignments the user received from a teacher, with submission status
export async function fetchRecipientAssignments(userId: string) {
  const recipients = await prisma.assignmentRecipent.findMany({
    where: { userId },
    include: {
      assignment: {
        include: {
          questions: true,
          submissions: {
            where: { creatorId: userId },
            select: { id: true },
          },
        },
      },
    },
  });

  return recipients.map(({ assignment }) => ({
    id: assignment.id,
    title: assignment.title,
    questions: assignment.questions.map((q) => ({ id: q.id, title: q.title })),
    hasSubmitted: assignment.submissions.length > 0,
  }));
}

export async function fetchSingularAssignment(assignmentId: number) {
  const assignment = await prisma.assignment.findFirst({
    where: { id: assignmentId },
    include: {
      questions: true,
    },
  });

  if (!assignment) return null;
  return toFrontendAssignment(assignment);
}
