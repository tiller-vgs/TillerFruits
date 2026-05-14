import { prisma } from "../lib/db";

//for user assignments
export async function fetchUserAssignments(userId: string) {
  const userAssignments = await prisma.assignment.findMany({
    where: {
      userId: userId,
    },
  });
  return userAssignments;
}
