/*
  Warnings:

  - You are about to drop the column `userId` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the `AssignmentUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignmentUser" DROP CONSTRAINT "AssignmentUser_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentUser" DROP CONSTRAINT "AssignmentUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "assignment" DROP CONSTRAINT "assignment_userId_fkey";

-- AlterTable
ALTER TABLE "assignment" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT;

-- DropTable
DROP TABLE "AssignmentUser";

-- CreateTable
CREATE TABLE "AssignmentRecipent" (
    "assignmentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AssignmentRecipent_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "creatorId" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionReviewer" (
    "submissionId" INTEGER NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "anonName" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SubmissionReviewer_pkey" PRIMARY KEY ("submissionId","reviewerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_fileId_key" ON "Submission"("fileId");

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentRecipent" ADD CONSTRAINT "AssignmentRecipent_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentRecipent" ADD CONSTRAINT "AssignmentRecipent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionReviewer" ADD CONSTRAINT "SubmissionReviewer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionReviewer" ADD CONSTRAINT "SubmissionReviewer_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
