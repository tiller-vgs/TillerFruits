import { prisma } from "../lib/db";

//for user assignments
export async function fetchUserAssignments(userId: string) {
  const userAssignments = await prisma.file.findMany({
    //QUERY ASSIGNMENT TABLE NOT FILE. ASSIGNMENT TABLE DOESNT EXIST YET SO I FETCH DIRECTLY FROM FILE
    where: {
      creatorId: userId,
    },
  });

  console.log("FetchUserAssignments, handler answered: " + userAssignments);
  return userAssignments;
}
